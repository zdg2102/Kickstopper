# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.destroy_all
neighbors = Category.create!(name: "Neighbors")
media_and_arts = Category.create!(name: "Media and Arts")
daily_life = Category.create!(name: "Daily Life")
work = Category.create!(name: "Work")

Subcategory.destroy_all
nosy_neighbors = neighbors.subcategories.create!(name: "Nosy Neighbors")
loud_neighbors = neighbors.subcategories.create!(name: "Loud Neighbors")
depressing_news = media.subcategories.create!(name: "Depressing News")
bad_music = media.subcategories.create!(name: "Bad Music")
going_out = daily_life.subcategories.create!(name: "Going Out")
airplanes = daily_life.subcategories.create!(name: "Airplanes")
social_media = daily_life.subcategories.create!(name: "Social Media")
bosses = work.subcategories.create!(name: "Bosses")
coworkers = work.subcategories.create!(name: "Coworkers")

Project.destroy_all
nosy_neighbors.projects.create!(
  title: "No Party This Weekend",
	category_featured: true,
	funding_goal: 1500,
	funding_date: Date.today + 7.days
	project_blurb: "Test blurb!",
	project_description: "Test description!",
)
