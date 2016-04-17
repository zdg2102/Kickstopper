class CreateUnlaunchedProjects < ActiveRecord::Migration
  def change
    create_table :unlaunched_projects do |t|
      t.string :title
      t.integer :creator_id, null: false
      t.integer :subcategory_id
      t.integer :funding_goal
      t.date :funding_date
      t.text :project_blurb
      t.text :project_description
      t.timestamps
    end

    add_index :unlaunched_projects, :creator_id
    add_index :unlaunched_projects, :subcategory_id
    add_foreign_key :unlaunched_projects, :users, column: :creator_id
    add_foreign_key :unlaunched_projects, :subcategories
  end
end
