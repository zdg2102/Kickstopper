class Api::UnlaunchedProjectsController < ApplicationController

  def create
    title = params[:project] && params[:project][:title] ?
      params[:project][:title] : ""
    @project = current_user.unlaunched_projects.create(title: title)
    if @project.save
      render json: @project
    else
      render json: { "error" => "Failed to save" }, status: 400
    end
  end

  def show
    @project = UnlaunchedProject.find(params[:id])
    if current_user.id == @project.creator_id
      render json: @project
    else
      render json: {}, status: 403
    end
  end

  def update
    @project = UnlaunchedProject.find(params[:id])
    if current_user.id == @project.creator_id
      @project.update(unlaunched_project_params)
      if @project.save
        render json: @project
      else
        render json: { "error" => "Failed to save" }, status: 400
      end
    else
      render json: {}, status: 403
    end
  end

  private

  def unlaunched_project_params
    params.require(:project).permit()
  end

end
