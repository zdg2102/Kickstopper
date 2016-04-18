class UnlaunchedProject < ActiveRecord::Base
  validates :creator_id, presence: true

end
