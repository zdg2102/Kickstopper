class Project < ActiveRecord::Base

	belongs_to :subcategory
	has_one :category, through: :subcategory

  # due to SQL database constraints, projects cannot try to raise
	# more than 2 billion

	# FINDTAG will need to add foreign key for creator once users
	# table is generated


end
