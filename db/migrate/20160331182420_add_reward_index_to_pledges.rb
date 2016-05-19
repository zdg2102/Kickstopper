class AddRewardIndexToPledges < ActiveRecord::Migration
  def change
    add_index :pledges, :reward_id
    add_foreign_key :pledges, :rewards
  end
end
