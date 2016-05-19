class CreateRewards < ActiveRecord::Migration
  def change
    create_table :rewards do |t|
      t.integer :project_id, null: false
      t.integer :minimum_pledge, null: false
      t.string :title, null: false
      t.text :description, null: false

      t.timestamps null: false
    end

    add_index :rewards, :project_id
    add_foreign_key :rewards, :projects
  end
end
