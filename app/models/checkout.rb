class Checkout < ActiveRecord::Base
  validates :user_id, :reward_id, :pledge_amount, presence: true
  validates :pledge_amount, numericality: { greater_than: 0 }

  belongs_to :user
  belongs_to :reward
  has_one :project, through: :reward

end
