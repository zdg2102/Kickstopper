class Api::ProjectsController < ApplicationController

  def index
    filter = FilterProjects.new(params[:projects])
		@projects = filter.matching_projects.includes(:creator, :images)
    render :index
	end

	def show
    # allows three values for param detailType:
		# main, panel, and tile
    @type = params[:detailType]
		if @type
	    @project = Project
        .includes(:creator, :backers, :pledges, :rewards, :images)
				.find(params[:id])
			render :show
		else
      render json: { "message" => "Must provide detail type param" },
			  status: 422
		end
	end

end
