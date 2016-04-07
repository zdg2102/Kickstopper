class FilterProjects

  def initialize(params)
    @params = params
  end

  def matching_projects(search_results = nil)
    # if search results were passed, filters those, otherwise
    # filters all projects
    projects = search_results || Project
    filter_by_params(projects)
  end

  private

  PER_PAGE_DEFAULT = 12

  def per_page
    @params && @params[:per_page] ? @params[:per_page] : PER_PAGE_DEFAULT
  end

  def filter_by_params(projects)
    # permitted project filter params:
    #   categoryName
    #   subcategoryName (must also have categoryName)
    #     (NB: category and subcategory names must be
    #       titleized to match the names in the database)
    #   term (i.e. search string)
    #   categoryId (only passed by search)
    #   subcategoryId (only passed by search)
    #   sort: (
    #     popularity
    #     newest
    #     endDate
    #    mostFunded
    #   )
    #   page (i.e. index for serving paginated results)
    #   per_page (defaults to 12)

    in_scope_projects = filter_by_category(projects)
    in_scope_projects = set_aggregate_calculations(in_scope_projects)
    in_scope_projects = set_sort_type(in_scope_projects)
    in_scope_projects = select_page(in_scope_projects)
    in_scope_projects
  end

  def filter_by_category(projects)
    if @params && @params[:categoryName]
      # add a filter condition on category name
      projects = projects.joins(:category)
        .where("categories.name = :category_name",
        category_name: @params[:categoryName].titleize)
      if @params[:subcategoryName]
        # add an additional condition on subcategory if one was passed
        projects = projects
          .where("subcategories.name = :subcategory_name",
          subcategory_name: @params[:subcategoryName].titleize)
      end
    else
      # if no category was given, return all projects
      projects = projects.all
    end
    projects
  end

  def set_aggregate_calculations(projects)
    # add backer_count and amount_pledged to avoid N + 1 querying
    projects
      .joins(<<-SQL)
        INNER JOIN "rewards" ON "rewards"."project_id" = "projects"."id"
        INNER JOIN "pledges" ON "pledges"."reward_id" = "rewards"."id"
        INNER JOIN "users" ON "users"."id" = "pledges"."user_id"
      SQL
      .group("projects.id")
      .select(<<-SQL)
        projects.*, COUNT(users.id) AS backer_count,
          SUM(pledges.pledge_amount) AS amount_pledged
      SQL
  end

  def set_sort_type(projects)
    if @params && @params[:sort]
      case @params[:sort]
      when "popularity"
        projects = projects.order("backer_count DESC")
      when "newest"
        projects = projects.order(created_at: :desc)
      when "endDate"
        projects = projects.order(funding_date: :asc)
      when "mostFunded"
        projects = projects.order("amount_pledged DESC")
      else
        # if they pass an incorrect value, default to end date
        projects = projects.order(funding_date: :asc)
      end
    else
      # if no sort provided, default to end date
      projects = projects.order(funding_date: :asc)
    end
    # also guarantee sub-sort is by id, to control order
    projects.order(id: :asc)
  end

  def select_page(projects)
    if @params && @params[:page]
      projects = projects.page(@params[:page]).per(per_page)
    else
      # if nothing specified, serve the first page
      projects = projects.page(1).per(per_page)
    end
    projects
  end

end
