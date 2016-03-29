class Api::ProjectsController < ApplicationController

  def index

	end

	private

	def filter_params
    params.require(:project).permit(:category, :subcategory)
	end

end
