class Reward < ActiveRecord::Base
  validates :project_id, :minimum_pledge, :title, :description,
	  presence: true
	validates :minimum_pledge, numericality: { only_integer: true,
		greater_than: 0, less_than: 2000000000 } # cap to avoid overflow
		# of DB int limit }

	belongs_to :project
	has_many :pledges

end
