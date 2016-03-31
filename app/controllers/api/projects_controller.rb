class Api::ProjectsController < ApplicationController

  def index
		# @projects = projects_by_params.with_amount_pledged
		#   .includes(:subcategory, :category, :creator, :backers)
			@projects = projects_by_params
			  .includes(:subcategory, :category, :creator, :backers, :pledges)
		render :index
	end

	def show
		# allows three values for param detailType:
		# main, panel, and tile
    @type = params[:detailType]
		if @type
	    @project = Project.includes(:creator)
				.includes(:backers)
				.includes(:pledges)
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

	def filter_params
    params.require(:project).permit(:category, :subcategory)
	end

	def projects_by_params
    # if any filters were passed up, they will be in a sub-hash
		# keyed in params off :projects
		# keys within this sub-hash:
		#  categoryName
		#  subcategoryName (must also have categoryName)
		#    (NB: category and subcategory names must be
		#      titleized to match the names in the database)
		#  term (for search term)
		#  categoryId (only passed by search)
		#  sort (string defining sort type)
		#    can be:
		#      popularity
		#      newest
		#      endDate
		#      mostFunded
		#  page (of whatever the overall filter set is)
		project_params = params[:projects]
    if project_params
			association = Project
      if project_params[:categoryName]
				association = association.joins(:subcategory).joins(:category)
				  .where("categories.name = :category_name",
					  category_name: project_params[:categoryName].titleize)
				if project_params[:subcategoryName]
          association = association
					  .where("subcategories.name = :subcategory_name",
						  subcategory_name: project_params[:subcategoryName].titleize)
				end
			else
        association = association.all
			end
			if project_params[:sort] == "popularity"

			elsif project_params[:sort] == "newest"

			elsif project_params[:sort] == "endDate"
        association = association.order(funding_date: :asc)
			elsif project_params[:sort] == "mostFunded"

			end
			association.page(1).per(per_page)
		else
			# rescue default if other params were not passed
      Project.page(1).per(per_page)
		end
	end

end
