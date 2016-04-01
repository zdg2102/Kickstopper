class Api::ProjectsController < ApplicationController

  def index
		@projects = projects_by_params
		  .preload(:subcategory, :category, :creator)
    render :index
	end

	def show
		# allows three values for param detailType:
		# main, panel, and tile
    @type = params[:detailType]
		if @type
	    @project = Project
        .includes(:creator, :backers, :pledges)
				.find(params[:id])
			render :show
		else
      render json: {"error" => "Must provide detail type param"},
			  status: 422
		end
	end

	private

	PER_PAGE = 12

	def per_page
		PER_PAGE
	end

	def projects_by_params
    # if any filters were passed up, they will be in a sub-hash
		# keyed in params on :projects
		# keys within this sub-hash:
		#  categoryName
		#  subcategoryName (must also have categoryName)
		#    (NB: category and subcategory names must be
		#      titleized to match the names in the database)
		#  term (for search term)
		#  categoryId (only passed by search)
    #  subcategoryId (only passed by search)
		#  sort (string defining sort type)
		#    can be:
		#      popularity
		#      newest
		#      endDate
		#      mostFunded
		#  page (of whatever the overall filter set is)

    in_scope_projects = category_projects
    in_scope_projects = set_aggregate_calculations(in_scope_projects)
    in_scope_projects = set_sort_type(in_scope_projects)
    in_scope_projects = select_page(in_scope_projects)
    in_scope_projects
	end

  def category_projects
    project_params = params[:projects]
    if project_params && project_params[:categoryName]
      # add a filter condition on category name
      projects = Project.joins(:category)
        .where("categories.name = :category_name",
        category_name: project_params[:categoryName].titleize)
      if project_params[:subcategoryName]
        # add an additional condition on subcategory if one was passed
        projects = projects
          .where("subcategories.name = :subcategory_name",
          subcategory_name: project_params[:subcategoryName].titleize)
      end
    else
      # if no category was given, return all projects
      projects = Project.all
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
    project_params = params[:projects]
    if project_params && project_params[:sort]
      case project_params[:sort]
      when "popularity"
        projects = projects.order("backer_count DESC")
      when "newest"
        #
      when "endDate"
        projects = projects.order(funding_date: :asc)
      when "mostFunded"
        projects = projects.order("amount_pledged DESC")
      else
        # if they pass an incorrect type, default to end date
        projects = projects.order(funding_date: :asc)
      end
    else
      # default to sort by end date
      projects = projects.order(funding_date: :asc)
    end
    projects
  end

  def select_page(projects)
    project_params = params[:projects]
    if project_params && project_params[:page]
      projects = projects.page(project_params[:page]).per(per_page)
    # if nothing specified, serve the first page
    else
      projects = projects.page(1).per(per_page)
    end
    projects
  end

end
