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
neighbors.subcategory.create!(name: "Nosy Neighbors")
neighbors.subcategory.create!(name: "Loud Neighbors")
media.subcategory.create!(name: "Depressing News")
media.subcategory.create!(name: "Bad Music")
daily_life.subcategory.create!(name: "Going Out")
daily_life.subcategory.create!(name: "Airplanes")
daily_life.subcategory.create!(name: "Social Media")
work.subcategory.create!(name: "Bosses")
work.subcategory.create!(name: "Coworkers")

Project.destroy_all
