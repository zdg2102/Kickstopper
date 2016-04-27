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

  def self.create_from_unlaunched_project(unlaunched_project)
    # take an unlaunched project and its rewards and convert
    # them to a project and its rewards (destroying the
    # unlaunched project and reward records after)

    # add the properties to the new project
    new_project = Project.create!(
      title: unlaunched_project.title,
      creator_id: unlaunched_project.creator_id,
      subcategory_id: unlaunched_project.subcategory_id,
      funding_goal: unlaunched_project.funding_goal,
      funding_date: unlaunched_project.funding_date,
      project_blurb: unlaunched_project.project_blurb,
      project_description: unlaunched_project.project_description,
    )
    # switch over the project images
    unlaunched_project.main_image.update!(
      imageable: new_project
    )
    unlaunched_project.secondary_image.update!(
      imageable: new_project
    )
    # create the new rewards
    unlaunched_rewards = unlaunched_project.unlaunched_rewards
    unlaunched_rewards.each do |unlaunched|
      new_project.rewards.create!(
        minimum_pledge: unlaunched.minimum_pledge,
        title: unlaunched.title,
        description: unlaunched.description
      )
    end
    # destroy the unlaunched records as they are no longer
    # needed
    unlaunched_project.unlaunched_rewards.destroy_all
    unlaunched_project.destroy
    # return the new project
    new_project
  end

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
      Stripe.api_key = ENV["stripe_secret_test_key"]
      charge_pledges.each do |pledge|
        stripe_token = pledge.stripe_customer_id
        # amount charged must be in cents
        Stripe::Charge.create(
          amount: (pledge.pledge_amount * 100).to_i,
          currency: 'usd',
          customer: stripe_token
        )
        # in a live version, this charge would be given
        # a destination of the Stripe account associated
        # with the project, and an application fee
        # parameter would also be passed to add the fee
        # charge
      end
    end
    # regardless of whether it reached its goal or not,
    # destroy all dependent records and self
    # (pledges will be destroyed by reward destruction)
    self.rewards.destroy_all
    self.images.destroy_all
    self.destroy
  end

end
