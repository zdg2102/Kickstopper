class Api::SearchesController < ApplicationController

  def search
    # pg_search returns a table that is very unfriendly to
    # additional joining (all project.* fields are included, making
    # it impossible to do aggregates), so first the
    # ids are extracted to allow normal aggregation
    valid_project_ids = Project.global_project_search(params[:term])
      .select("projects.id AS id").pluck(:id)
    results = Project.where(id: valid_project_ids)
    filter_params = params[:projects] ? params[:projects] : {}
    filter_params[:per_page] = 4
    filter = FilterProjects.new(filter_params)
    @projects = filter.matching_projects(results).includes(:creator, :images)
    render "api/projects/index"
  end

end
