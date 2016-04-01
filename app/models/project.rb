class Project < ActiveRecord::Base
  validates :title, :creator_id, :subcategory_id, :funding_goal,
	  :funding_date, presence: true
	# 2 billion cap is to avoid overflow of DB limit for integer fields
	validates :funding_goal, numericality: { only_integer: true,
		greater_than: 0, less_than: 2000000000 }

	belongs_to :subcategory
	belongs_to :creator, class_name: 'User', foreign_key: :creator_id
	has_one :category, through: :subcategory
	has_many :rewards
	has_many :pledges, through: :rewards
	has_many :backers, through: :pledges, source: :user

	def amount_pledged
    # check if name is already set as part of aggregate query,
    # to avoid firing an extra query
		if self.read_attribute(:amount_pledged)
			read_attribute(:amount_pledged)
		else
			self.pledges.sum(:pledge_amount)
		end
	end

	def backer_count
    # check if name is already set as part of aggregate query,
    # to avoid firing an extra query
    if self.read_attribute(:backer_count)
      read_attribute(:backer_count)
    else
      backers.size
    end
	end

end
