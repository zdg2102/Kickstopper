class AddForeignKeyToSubcategories < ActiveRecord::Migration
  def change
    add_foreign_key :subcategories, :categories
  end
end
