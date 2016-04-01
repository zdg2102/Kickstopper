# Top level categories for projects
# Every project must have both category and subcategory

class Category < ActiveRecord::Base
	validates :name, presence: true

	has_many :subcategories, dependent: :destroy
	has_many :projects, through: :subcategories

end
