# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

SessionToken.destroy_all
Pledge.destroy_all
Reward.destroy_all
Project.destroy_all
User.destroy_all
Subcategory.destroy_all
Category.destroy_all

neighbors = Category.create!(name: "Neighbors")
media_and_arts = Category.create!(name: "Media And Arts")
daily_life = Category.create!(name: "Daily Life")
work = Category.create!(name: "Work")

weird_neighbors = neighbors.subcategories.create!(name: "Nosy Neighbors")
loud_neighbors = neighbors.subcategories.create!(name: "Loud Neighbors")
depressing_news = media_and_arts.subcategories.create!(name: "Depressing News")
bad_music = media_and_arts.subcategories.create!(name: "Bad Music")
going_out = daily_life.subcategories.create!(name: "Going Out")
airplanes = daily_life.subcategories.create!(name: "Airplanes")
social_media = daily_life.subcategories.create!(name: "Social Media")
bosses = work.subcategories.create!(name: "Bosses")
coworkers = work.subcategories.create!(name: "Coworkers")

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

projects = []

# make 5 to 20 duplicates of each project

(5 + rand(15)).times do
  projects << weird_neighbors.projects.create!(
    title: "Stop the Yodeling Guy"
  )
end

(5 + rand(15)).times do
  projects << loud_neighbors.projects.create!(
    title: "No Party This Weekend",
    creator_id: users.sample.id,
  	category_featured: [false, false, false, false, true].sample,
  	funding_goal: rand(7000) + 1000,
  	funding_date: Date.today + (7 + rand(7)).days,
  	project_blurb: "You won't have to hear us yelling all night!",
  	project_description: "Hi neighbors, we're those three guys who"\
    "live upstairs, the ones who invite over a howling horde of"\
    "barbarians every Friday and Saturday night to stomp on the"\
    "floor and randomly burst into fits of screaming (maybe"\
    "somebody's laughing? Maybe somebody's getting murdered? Difficult"\
    "to say), going until 3 or 4 AM. If we meet our funding goal here"\
    "on Kickstopper, we promise this weekend our apartment will be"\
    "silent as the tomb, and you can finally watch Netflix in peace."\
    "(The money may or may not be used to have an even more obnoxious"\
    "party next weekend, no promises...)",
  )
end

(5 + rand(15)).times do
  projects << loud_neighbors.projects.create!(
    title: "Shut the Dog Up",
    creator_id: users.sample.id,
    category_featured: [false, false, false, false, true].sample,
    funding_goal: rand(500) + 200,
    funding_date: Date.today + (20 + rand(20)).days,
    project_blurb: "Buy that stupid dog some toys so it stops barking",
    project_description: ""
  )
end

(5 + rand(15)).times do
  projects << depressing_news.projects.create!(
    title: "No Depressing News",
  	creator_id: users.sample.id,
  	category_featured: false,
  	funding_goal: 1000000,
  	funding_date: Date.today + 25.days,
  	project_blurb: "Avoid having to see depressing news"\
  	  " stories every day!",
  	project_description: "Isn't seeing what's in the news every"\
  	  " day depressing? Wouldn't you like to avoid some of that"\
  		" in your life? For just that reason, we your friends here"\
  		" at CNN, MSNBC, the New York Times, and even all the way down"\
  		" to Buzzfeed are offering this special Kickstopper project."\
  		" Just give us money, and we'll give you a day where we don't"\
  		" show you anything that makes you want to cover your eyes"\
      " to avoid seeing the state of humanity!"
  )
end






projects = []

400.times do
  category = categories.sample
	subcategory = category.subcategories.sample
	projects << subcategory.projects.create!(
	  title: Faker::Commerce.product_name,
		creator_id: users.sample.id,
		category_featured: [true, false].sample,
		funding_goal: rand(1000) + 1,
		funding_date: Date.today + (rand(30).days + 3),
		project_blurb: Faker::Company.bs * (rand(6) + 1),
		project_description: Faker::Hipster.paragraph * (rand(6) + 1)
	)
end

rewards = []

projects.each do |project|
  (rand(5) + 1).times do
    rewards << project.rewards.create!(
		  minimum_pledge: rand(1000) + 1,
			title: Faker::Company.bs,
			description: Faker::Company.bs * (rand(6) + 1)
		)
	end
end

1000.times do
  reward = rewards.sample
	reward.pledges.create!(
	  user_id: users.sample.id,
		pledge_amount: rand(1000) + 1 + (rand(100).to_f / 100)
	)
end
