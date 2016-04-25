# clear all existing rows
SessionToken.destroy_all
Checkout.destroy_all
Image.destroy_all
Pledge.destroy_all
UnlaunchedReward.destroy_all
UnlaunchedProject.destroy_all
Reward.destroy_all
Project.destroy_all
User.destroy_all
Subcategory.destroy_all
Category.destroy_all

neighbors = Category.create!(name: "Neighbors")
media_and_arts = Category.create!(name: "Media And Arts")
daily_life = Category.create!(name: "Daily Life")
work = Category.create!(name: "Work")

weird_neighbors = neighbors.subcategories.create!(name: "Weird Neighbors")
loud_neighbors = neighbors.subcategories.create!(name: "Loud Neighbors")
depressing_news = media_and_arts.subcategories
  .create!(name: "Depressing News")
bad_music = media_and_arts.subcategories.create!(name: "Bad Music")
going_out = daily_life.subcategories.create!(name: "Going Out")
airplanes = daily_life.subcategories.create!(name: "Airplanes")
social_media = daily_life.subcategories.create!(name: "Social Media")
bosses = work.subcategories.create!(name: "Bosses")

# create Guest user to work with Guest Login button
User.create!(name: "Guest", email: "GuestSession", password: "password")

users = []

700.times do
	u = User.create(
	  name: Faker::Name.name,
		email: Faker::Internet.email,
		password: "password"
	)
	# ignore in case of duplicate email from Faker
	if u.save
		users << u
	end
end

# delegates project, reward, and pledge creation to GenerateSeeds
new_seeds = GenerateSeeds.new(94)
new_seeds.generate_new_seeds
