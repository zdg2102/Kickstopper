class RemoveCategoryIdFromProjects < ActiveRecord::Migration
  def change
		remove_foreign_key :projects, :categories
		remove_column :projects, :category_id
  end
end
