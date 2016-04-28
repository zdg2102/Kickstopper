# Subcategory under category
# Every project must have a category and subcategory

class Subcategory < ActiveRecord::Base
	validates :category_id, :name, presence: true

  belongs_to :category
	has_many :projects

end
