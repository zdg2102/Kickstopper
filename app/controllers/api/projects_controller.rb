class Api::ProjectsController < ApplicationController

  def index
    @projects = Project.all
		render :index
	end

	def show
		# allows three values for param detailType:
		# main, panel, and tile
    @type = params[:detailType]
		if @type
	    @project = Project.find(params[:id])
			render :show
		else
      render json: {"error" => "Must provide detail type param"},
			  status: 422
		end
	end

	private

	def filter_params
    params.require(:project).permit(:category, :subcategory)
	end

end
