class CreatePledges < ActiveRecord::Migration
  def change
    create_table :pledges do |t|
      t.integer :user_id, null: false
      t.integer :reward_id, null: false
      t.float :pledge_amount, null: false, scale: 2

      t.timestamps null: false
    end

    add_index :pledges, :user_id
    add_foreign_key :pledges, :users
  end
end
