# A user's commitment to fund a project for a given value

class Pledge < ActiveRecord::Base
  validates :user_id, :reward_id, :pledge_amount, presence: true
  validate :pledge_amount_greater_than_reward_minimum

  belongs_to :user
  belongs_to :reward
  has_one :project, through: :reward

  private

  def pledge_amount_greater_than_reward_minimum
    if reward.minimum_pledge > pledge_amount
      errors.add(:pledge_amount, "must be greater than reward minimum pledge")
    end
  end

end
