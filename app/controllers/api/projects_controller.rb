class Api::ProjectsController < ApplicationController

  def index
    filter = FilterProjects.new(params[:projects])
		@projects = filter.matching_projects.includes(:creator, :images)
    @projects = ApplicationDecorator.decorate_collection(@projects)
    render :index
	end

  def create
    # creates project from unlaunched project and destroys
    # unlaunched project and its rewards, reassigns its images
    # to the project
    unlaunched_project = UnlaunchedProject
      .find(params[:unlaunchedProjectId])
    if current_user.id == unlaunched_project.creator_id
      @project = Project
        .create_from_unlaunched_project(unlaunched_project)
      # only need to return the id so we can redirect to the
      # project page
      render json: { "id" => @project.id }, status: 200
    else
      render json: {}, status: 403
    end
  end

	def show
    # allows three values for param detailType:
		# main, panel, and tile
    @type = params[:detailType]
		if @type
	    @project = Project
        .includes(:creator, :backers, :pledges, :rewards, :images)
				.find(params[:id])
      @project = ApplicationDecorator.decorate(@project)
			render :show
		else
      render json: { "message" => "Must provide detail type param" },
			  status: 422
		end
	end

end
