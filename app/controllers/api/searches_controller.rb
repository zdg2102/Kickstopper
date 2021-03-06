class Api::SearchesController < ApplicationController

  def search
    filter_params = {
      per_page: 4,
      term: params[:term]
    }
    filter = FilterProjects.new(filter_params)
    @projects = filter.matching_projects.includes(:creator, :images)
    @projects = ApplicationDecorator.decorate_collection(@projects)
    render "api/projects/index"
  end

end
