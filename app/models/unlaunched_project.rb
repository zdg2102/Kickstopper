class UnlaunchedProject < ActiveRecord::Base
  validates :creator_id, presence: true

  has_many :unlaunched_rewards, dependent: :destroy
  has_many :images, as: :imageable

  def main_image
    images.where(use_type: :project_main).first
  end

  def secondary_image
    images.where(use_type: :project_secondary).first
  end

end
