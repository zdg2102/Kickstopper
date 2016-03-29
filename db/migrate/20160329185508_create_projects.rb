class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
			t.string :title, null: false
			t.integer :creator_id, null: false
			t.integer :category_id, null: false
			t.integer :subcategory_id, null: false
			t.boolean :category_featured, default: false
			t.integer :funding_goal, null: false
			t.date :funding_date, null: false
			t.text :project_blub
			t.text :project_description

      t.timestamps null: false
    end

		add_index :projects, :creator_id
		add_index :projects, :category_id
		add_index :projects, :subcategory_id

		add_foreign_key :projects, :categories
		add_foreign_key :projects, :subcategories
  end
end
