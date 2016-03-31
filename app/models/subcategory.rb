class Subcategory < ActiveRecord::Base
	validates :category_id, :name, presence: true

  belongs_to :category
	has_many :projects

end
