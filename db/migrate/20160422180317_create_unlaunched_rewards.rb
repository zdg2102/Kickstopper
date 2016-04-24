class CreateUnlaunchedRewards < ActiveRecord::Migration
  def change
    create_table :unlaunched_rewards do |t|
      t.integer :unlaunched_project_id, null: false
      t.integer :minimum_pledge
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
