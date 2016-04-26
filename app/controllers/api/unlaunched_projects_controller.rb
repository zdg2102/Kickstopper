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
        if params[:project][:main_image]
          @project.images.create!(
            picture: params[:project][:main_image],
            use_type: :project_main
          )
        end
        if params[:project][:secondary_image]
          @project.images.create!(
            picture: params[:project][:secondary_image],
            use_type: :project_secondary
          )
        end
        if params[:reward_one][:minimum_pledge] != "" &&
          params[:reward_one][:title] != "" &&
          params[:reward_one][:description] != ""
          @project.unlaunched_rewards.create!(
            minimum_pledge: params[:reward_one][:minimum_pledge],
            title: params[:reward_one][:title],
            description: params[:reward_one][:description]
          )
        end
        if params[:reward_two][:minimum_pledge] != "" &&
          params[:reward_two][:title] != "" &&
          params[:reward_two][:description] != ""
          @project.unlaunched_rewards.create!(
            minimum_pledge: params[:reward_two][:minimum_pledge],
            title: params[:reward_two][:title],
            description: params[:reward_two][:description]
          )
        end
        if params[:reward_three][:minimum_pledge] != "" &&
          params[:reward_three][:title] != "" &&
          params[:reward_three][:description] != ""
          @project.unlaunched_rewards.create!(
            minimum_pledge: params[:reward_three][:minimum_pledge],
            title: params[:reward_three][:title],
            description: params[:reward_three][:description]
          )
        end

        # NOTE need to replace this with a proper JSON
        # rendering
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
