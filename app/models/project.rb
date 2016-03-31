class Project < ActiveRecord::Base
  validates :title, :creator_id, :subcategory_id, :funding_goal,
	  :funding_date, presence: true
	validates :funding_goal, numericality: { only_integer: true,
		greater_than: 0, less_than: 2000000000 } # cap to avoid overflow
		# of DB int limit

	belongs_to :subcategory
	belongs_to :creator, class_name: 'User', foreign_key: :creator_id
	has_one :category, through: :subcategory
	has_many :rewards
	has_many :pledges, through: :rewards
	has_many :backers, through: :pledges, source: :user


end
