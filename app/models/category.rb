# Top level categories for projects
# Every project must have both category and subcategory

class Category < ActiveRecord::Base

	has_many :subcategories
	has_many :projects, through: :subcategories

	# FINDTAG remove temp method

	def self.ensure_categories

		# temporary method to ensure database is correctly populated
		# with desired categories and subcategories
    self.destroy_all
		Subcategory.destroy_all

		category_structure = {
			catA: [:subcatA1, :subcatA2],
			catB: [:subcatB1, :subcatB2, :subcatB3, :subcatB4],
			catC: [:subcatC1, :subcatC2, :subcatC3]
		}

		category_structure.each do |cat, subcats|
			new_cat = self.create!(name: cat.to_s)
			subcats.each do |subcat|
				new_cat.subcategories.create!(name: subcat.to_s)
			end
		end

	end


end
