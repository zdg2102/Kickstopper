class FilterProjects

  def initialize(params)
    @params = params
  end

  def matching_projects
    filter_by_params(Project)
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
    #   sort: (
    #     popularity
    #     newest
    #     endDate
    #     mostFunded
    #     searchRank (only if term is present)
    #   )
    #   page (i.e. index for serving paginated results)
    #   per_page (defaults to 12)

    in_scope_projects = filter_by_category(projects)
    in_scope_projects = set_aggregate_calculations(in_scope_projects)
    in_scope_projects = filter_by_search_term(in_scope_projects)
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
        LEFT OUTER JOIN "rewards" ON "rewards"."project_id" = "projects"."id"
        LEFT OUTER JOIN "pledges" ON "pledges"."reward_id" = "rewards"."id"
        LEFT OUTER JOIN "users" ON "users"."id" = "pledges"."user_id"
      SQL
      .group("projects.id")
      .select(<<-SQL)
        projects.*, COALESCE(COUNT(users.id), 0) AS backer_count,
          COALESCE(SUM(pledges.pledge_amount), 0) AS amount_pledged
      SQL
  end

  def filter_by_search_term(projects)
    # filters by comparison with the results of pg_search
    # if a search term is passed
    if @params && @params[:term]
      # pg_search returns a table that is unfriendly to
      # additional joining due to the randomized aliasing of the rank
      # field, so it is only used to generate ids and rank
      search_match_ids = Project.text_search(@params[:term])
        .select("projects.id AS id").pluck(:id)
      # if no matches found, return none
      return Project.none if search_match_ids.empty?
      # then a union-all psuedo-table is built for interpolation,
      # so the search result ranking can be preserved
      project_rank_table = search_match_ids.each_with_index.map do |id, index|
        new_line = "SELECT #{id} project_id, #{index + 1} project_rank"
        new_line += "\nUNION ALL" unless index == search_match_ids.size.pred
        new_line
      end
      project_rank_table = project_rank_table.join("\n")
      # the current set of projects are converted to a table that
      # is used for the aggregate totals (this causes duplicate
      # retrieval from the projects table, but this is hard to
      # avoid due to ActiveRecord not giving control over the FROM clause)
      project_aggregates_table = projects.to_sql
      # the new set of projects is determined by joining the ranks to
      # data table, leaving us with only the relevant projects with
      # their search rank now appended
      projects = Project
        .select(<<-SQL)
          projects.*, ranks.project_rank AS search_rank, aggs.backer_count
            AS backer_count, aggs.amount_pledged AS amount_pledged
        SQL
        .joins(<<-SQL)
          INNER JOIN
            (#{project_aggregates_table}) AS aggs
          ON
            aggs.id = projects.id
          INNER JOIN
            (#{project_rank_table}) AS ranks
          ON
            ranks.project_id = projects.id
        SQL
      projects
    else
      # if no term is given, return the original set of projects
      projects
    end
  end

  def set_sort_type(projects)
    if @params && @params[:sort]
      # before getting into the switch statement, check if
      # there's a valid request for searchRank (valid meaning
      # a term was also passed)
      if @params[:term] && @params[:sort] == "searchRank"
        projects = projects.order("search_rank ASC")
        return projects
      end
      # otherwise check for the regular sorts
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
        # if they pass an incorrect value, default to end date for
        # regular requests and search rank for search requests
        if @params[:term]
          projects = projects.order("search_rank ASC")
        else
          projects = projects.order(funding_date: :asc)
        end
      end
    else
      # if no sort provided, default to end date for regular requests
      # and search rank for search requests
      if @params && @params[:term]
        projects = projects.order("search_rank ASC")
      else
        projects = projects.order(funding_date: :asc)
      end
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
