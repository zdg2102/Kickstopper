class PrepUsersForOmniauth < ActiveRecord::Migration
  def change
    remove_column :users, :remember_created_at
    change_column :users, :password_hash, :string, null: true
  end
end
