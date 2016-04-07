class CreateCheckouts < ActiveRecord::Migration
  def change
    create_table :checkouts do |t|
      t.integer :user_id, null: false
      t.integer :reward_id, null: false
      t.float :pledge_amount, null: false, scale: 2

      t.timestamps null: false
    end

    add_index :checkouts, :user_id
    add_foreign_key :checkouts, :users
    add_index :checkouts, :reward_id
    add_foreign_key :checkouts, :rewards
  end
end
