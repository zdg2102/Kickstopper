class AddIndexToUnlaunchedProjects < ActiveRecord::Migration
  def change
    add_index :unlaunched_rewards, :unlaunched_project_id
    add_foreign_key :unlaunched_rewards, :unlaunched_projects
  end
end
