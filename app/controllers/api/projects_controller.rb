class Api::ProjectsController < ApplicationController

  def index

    # FINDTAG might want to remove backer count from aggregate function,
    # since backer count only gets pulled for single projects

    filter = FilterProjects.new(params[:projects])
		@projects = filter.matching_projects.includes(:creator, :main_image)
    render :index
	end

	def show
    # allows three values for param detailType:
		# main, panel, and tile
    @type = params[:detailType]
		if @type
	    @project = Project
        .includes(:creator, :backers, :pledges, :rewards, :main_image,
          :secondary_image)
				.find(params[:id])
			render :show
		else
      render json: { "message" => "Must provide detail type param" },
			  status: 422
		end
	end

end
