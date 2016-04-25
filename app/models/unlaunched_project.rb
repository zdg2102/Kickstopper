class UnlaunchedProject < ActiveRecord::Base
  validates :creator_id, presence: true

  has_many :unlaunched_rewards, dependent: :destroy

end
