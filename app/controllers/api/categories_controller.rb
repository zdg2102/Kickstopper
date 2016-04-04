class Api::CategoriesController < ApplicationController

  def index
    # returns full tree of categories
    @categories = Category.all.includes(:subcategories)
    render :index
  end

end
