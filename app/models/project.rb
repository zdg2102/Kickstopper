class Project < ActiveRecord::Base
  include PgSearch
  pg_search_scope :global_project_search,
    against: {
      title: 'A',
      project_blurb: 'B',
      project_description: 'C'
    },
    associated_against: {
      creator: { name: 'B' },
      rewards: { title: 'D', description: 'D' }
    }

  has_one :main_image, as: :imageable, class_name: 'Image'

  has_one :secondary_image, as: :imageable, class_name: 'Image'

  # has_attached_file :main_image
  # validates_attachment_content_type :main_image, content_type: /\Aimage\/.*\Z/
  # # validates_attachment_presence :main_image
  #
  # has_attached_file :secondary_image
  # validates_attachment_content_type :secondary_image, content_type: /\Aimage\/.*\Z/
  # # validates_attachment_presence :secondary_image

  validates :title, :creator_id, :subcategory_id, :funding_goal,
	  :funding_date, presence: true
	# 2 billion cap is to avoid overflow of DB limit for integer fields
	validates :funding_goal, numericality: { only_integer: true,
		greater_than: 0, less_than: 2000000000 }

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

end
