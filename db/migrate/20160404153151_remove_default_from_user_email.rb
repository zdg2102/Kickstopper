class RemoveDefaultFromUserEmail < ActiveRecord::Migration
  def change
    change_column :users, :email, :string, null: false, default: nil
  end
end
