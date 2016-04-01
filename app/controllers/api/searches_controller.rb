class Api::SearchesController < ApplicationController

  def search
    results = Project.global_project_search(params[:term])
    filter = FilterProjects.new(params[:projects])
    @projects = filter.matching_projects(results)
    render "api/projects/index"
  end

end
