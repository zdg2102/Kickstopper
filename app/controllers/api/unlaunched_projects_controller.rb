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
      if params[:project][:duration] != ""
        duration = params[:project][:duration].to_i
        params[:project][:funding_date] = Date.today + duration.days
      end
      if params[:project][:subcategory] != ""
        params[:project][:subcategory_id] = Subcategory
          .find_by(name: params[:project][:subcategory].titleize).id
      end
      if params[:project][:funding_goal] != ""
        params[:project][:funding_goal] =
          params[:project][:funding_goal].to_i
      end
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
    params.require(:project).permit(:title, :funding_date,
      :subcategory_id, :project_blurb, :project_description,
      :funding_goal)
  end

end
