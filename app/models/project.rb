class Project < ActiveRecord::Base
  include PgSearch
  pg_search_scope :text_search,
    against: {
      title: 'A',
      project_blurb: 'B',
      project_description: 'C'
    },
    associated_against: {
      creator: { name: 'B' },
      rewards: { title: 'D', description: 'D' }
    }

  validates :title, :creator_id, :subcategory_id, :funding_goal,
	  :funding_date, presence: true
	# 2 billion cap is to avoid overflow of DB limit for integer fields
	validates :funding_goal, numericality: { only_integer: true,
		greater_than: 0, less_than: 2000000000 }

  has_many :images, as: :imageable

	belongs_to :subcategory
	belongs_to :creator, class_name: 'User', foreign_key: :creator_id
	has_one :category, through: :subcategory
	has_many :rewards, -> { order(minimum_pledge: :asc) }, dependent: :destroy
	has_many :pledges, through: :rewards, dependent: :destroy
	has_many :backers, through: :pledges, source: :user

	def amount_pledged
    # check if value is already set as part of aggregate query,
    # to avoid firing an extra query
		if self.read_attribute(:amount_pledged)
			read_attribute(:amount_pledged)
		else
			self.pledges.sum(:pledge_amount)
		end
	end

	def backer_count
    # check if value is already set as part of aggregate query,
    # to avoid firing an extra query
    if self.read_attribute(:backer_count)
      read_attribute(:backer_count)
    else
      backers.size
    end
	end

  def main_image
    images.where(use_type: :project_main).first
  end

  def secondary_image
    images.where(use_type: :project_secondary).first
  end

  def handle_funding_date
    # check if project has reached its funding date
    if amount_pledged >= funding_goal
      # charge all the pledges that have Stripe card tokens
      charge_pledges = self.pledges
        .where("pledges.stripe_customer_id IS NOT NULL")
      charge_pledges.each do |pledge|
        stripe_token = pledge.stripe_customer_id
        # 
      end
    end
    # regardless of whether it reached its goal or not,
    # destroy all dependent records and self
    self.pledges.destroy_all
    self.rewards.destroy_all
    self.destroy
  end

end
