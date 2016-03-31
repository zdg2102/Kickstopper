class AddUserKeyToProjects < ActiveRecord::Migration
  def change
		add_foreign_key :projects, :users, column: :creator_id
  end
end
