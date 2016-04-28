# Project still in the process of being created
# Stored in a separate table to avoid accidental mixing
# and allow different database-level constraints

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
