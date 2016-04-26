class Api::ProjectsController < ApplicationController

  def index
    filter = FilterProjects.new(params[:projects])
		@projects = filter.matching_projects.includes(:creator, :images)
    render :index
	end

  def create
    # creates project from unlaunched project and destroys
    # unlaunched project and its rewards, reassigns its images
    # to the project
    unlaunched_project = UnlaunchedProject
      .find(params[:unlaunchedProjectId])
    if current_user.id == unlaunched_project.creator_id
      # add the properties to the new project
      @project = Project.create(
        title: unlaunched_project.title,
        creator_id: unlaunched_project.creator_id,
        subcategory_id: unlaunched_project.subcategory_id,
        funding_goal: unlaunched_project.funding_goal,
        funding_date: unlaunched_project.funding_date,
        project_blurb: unlaunched_project.project_blurb,
        project_description: unlaunched_project.project_description,
      )
      if @project.save
        # switch over the project images
        unlaunched_project.main_image.update!(
          imageable: @project
        )
        unlaunched_project.secondary_image.update!(
          imageable: @project
        )
        # create the rewards based on however many
        # rewards the unlaunched had
        unlaunched_rewards = unlaunched_project.unlaunched_rewards
        unlaunched_rewards.each do |ul_reward|
          @project.rewards.create!(
            minimum_pledge: ul_reward.minimum_pledge,
            title: ul_reward.title,
            description: ul_reward.description
          )
        end
        # if we successfully reached here, destroy
        # the unlaunched records
        unlaunched_project.unlaunched_rewards.destroy_all
        unlaunched_project.destroy
        # return the project id so we can redirect
        render json: { "id" => @project.id }, status: 200
      else
        render json: { "error" => "Failed to save" }, status: 400
      end
    else
      render json: {}, status: 403
    end
  end

	def show
    # allows three values for param detailType:
		# main, panel, and tile
    @type = params[:detailType]
		if @type
	    @project = Project
        .includes(:creator, :backers, :pledges, :rewards, :images)
				.find(params[:id])
			render :show
		else
      render json: { "message" => "Must provide detail type param" },
			  status: 422
		end
	end

end
