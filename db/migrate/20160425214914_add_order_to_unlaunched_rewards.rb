class AddOrderToUnlaunchedRewards < ActiveRecord::Migration
  def change
    add_column :unlaunched_rewards, :order, :integer
  end
end
