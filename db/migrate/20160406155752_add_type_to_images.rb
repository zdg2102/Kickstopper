class AddTypeToImages < ActiveRecord::Migration
  def change
    add_column :images, :use_type, :string, null: false
  end
end
