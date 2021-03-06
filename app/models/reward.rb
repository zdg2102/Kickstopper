# reward that a user can select for funding a project

class Reward < ActiveRecord::Base
  validates :project_id, :minimum_pledge, :title, :description,
    presence: true
  # 2 billion cap is to avoid overflow of DB limit for integer fields
  validates :minimum_pledge, numericality: { only_integer: true,
    greater_than: 0, less_than: 2000000000 }

  belongs_to :project
  has_many :pledges, dependent: :destroy
  has_many :checkouts, dependent: :destroy

end
