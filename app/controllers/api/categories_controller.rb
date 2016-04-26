class Api::CategoriesController < ApplicationController

  def index
    # returns full tree of categories
    @categories = Api::CategoryDecorator.decorate_collection(Category
      .all.includes(:subcategories))
    render :index
  end

end
