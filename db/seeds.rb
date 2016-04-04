# clear all existing rows
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

# make 5 to 20 duplicates of each project, its rewards, and its pledges
# (with all non-text values randomized each time)

(5 + rand(15)).times do
  parrot_guy = weird_neighbors.projects.create!(
    title: "Stop the Parrot Guy",
    creator_id: users.sample.id,
    category_featured: [false, false, false, false, true].sample,
    funding_goal: rand(3000) + 1000,
    funding_date: Date.today + (14 + rand(10)).days,
    project_blurb: "Let's hire someone to steal Steve's parrots",
    project_description: "Everyone in the building knows Steve,"\
    " the weird guy who lives upstairs with all the parrots."\
    " What one person needs with eleven parrots I don't know,"\
    " but I think we can all agree it's a little creepy (and smelly,"\
    " and loud, especially when they all decide to start repeating"\
    " each other). With the funds raised with this Kickstopper,"\
    " I will hire a professional parrot kidnapper to break in"\
    " while Steve is at work, steal all those parrots, and"\
    " donate them to a wildlife sanctuary, so we can all have"\
    " a wonderful, parrot-free building."
  )

  parrot_reward_one = parrot_guy.rewards.create!(
    minimum_pledge: 50,
    title: "Good Neighbor Tier",
    description: "At this tier, the next time you move, I will "\
      " tell your new neighbors nice things about what a good"\
      " neighbor you were (regardless if it was true or not)."
  )

  rand(8).times do
    parrot_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 50 + rand(100)
    )
  end

  parrot_reward_two = parrot_guy.rewards.create!(
    minimum_pledge: 500,
    title: "True Parrot Hater Tier",
    description: "At this tier, I will make you a hat with "\
      " a custom message on it about how much you hate parrots"\
      " so any parrots you encounter in the future will know"\
      " not to annoy you."
  )

  rand(3).times do
    parrot_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 500 + rand(300)
    )
  end

end

(5 + rand(15)).times do
  no_party = loud_neighbors.projects.create!(
    title: "No Party This Weekend",
    creator_id: users.sample.id,
  	category_featured: [false, false, false, false, true].sample,
  	funding_goal: rand(7000) + 1000,
  	funding_date: Date.today + (7 + rand(7)).days,
  	project_blurb: "You won't have to hear us yelling all night!",
  	project_description: "Hi neighbors, we're those three guys who"\
    " live upstairs, the ones who invite over a howling horde of"\
    " barbarians every Friday and Saturday night to stomp on the"\
    " floor and randomly burst into fits of screaming (maybe"\
    " somebody's laughing? Maybe somebody's getting murdered? Difficult"\
    " to say) that go on until 3 or 4 AM. If we meet our funding goal here"\
    " on Kickstopper, we promise this weekend our apartment will be"\
    " silent as the tomb, and you can finally watch Netflix in peace."\
    " (The money may or may not be used to have an even louder"\
    " party next weekend, no promises...)",
  )

  party_reward_one = no_party.rewards.create!(
    minimum_pledge: 50,
    title: "Cleanup Tier",
    description: "At this tier, we will make sure the next time"\
      " we do have a party not to leave piles of mysteriously"\
      " appearing random trash outside your door."
  )

  rand(18).times do
    party_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 50 + rand(100)
    )
  end

  party_reward_two = no_party.rewards.create!(
    minimum_pledge: 500,
    title: "Song Skipper Tier",
    description: "At this tier, the next time we have a party,"\
    " you get the privilege of calling us angrily to have us turn"\
    " the music down, and we'll actually listen (for the length"\
    " of one song)."
  )

  rand(4).times do
    party_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 500 + rand(300)
    )
  end

  party_reward_three = no_party.rewards.create!(
    minimum_pledge: 1000,
    title: "Do Unto Others Tier",
    description: "At this tier, the next time we have a party,"\
      " we will wait to do it until you're out of town for the"\
      " weekend, and then have a extra loud one so all the other"\
      " neighbors have to deal with it but you're far away relaxing."
  )

  rand(2).times do
    party_reward_three.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 1000 + rand(500)
    )
  end

end

(5 + rand(15)).times do
  dog = loud_neighbors.projects.create!(
    title: "Shut the Dog Up",
    creator_id: users.sample.id,
    category_featured: [false, false, false, false, true].sample,
    funding_goal: rand(500) + 200,
    funding_date: Date.today + (20 + rand(20)).days,
    project_blurb: "Buy that stupid dog some toys so it stops barking",
    project_description: "Why would anybody buy a little yippy dog?"\
    " I have no idea. Yet there it is, and I think everyone in five"\
    " blocks can hear it. I think it probably makes those noises all"\
    " day because it's bored and has too much energy. And with that"\
    " (faint, thin) hope, I'm using this Kickstopper to raise funds to"\
    " buy that dog more toys than it could possibly know what to do"\
    " with. Maybe that will finally tire it out so it stops barking..."
  )

  dog_reward_one = dog.rewards.create!(
    minimum_pledge: 20,
    title: "Happy Ears Tier",
    description: "At this tier, you get the satisfaction of"\
    " (hopefully) not having to hear that dog yipping all day"\
    " anymore."
  )

  rand(10).times do
    dog_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 20 + rand(30)
    )
  end

  dog_reward_two = dog.rewards.create!(
    minimum_pledge: 100,
    title: "Guaranteed Results Tier",
    description: "At this tier, I will buy you a very expensive"\
    " set of earplugs, so that even if my plan fails and the dog"\
    " doesn't quiet down, you're still guaranteed peace and quiet."
  )

  rand(3).times do
    dog_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 100 + rand(100)
    )
  end

end

(5 + rand(15)).times do
  news = depressing_news.projects.create!(
    title: "No Depressing News",
  	creator_id: users.sample.id,
  	category_featured: [false, false, false, false, true].sample,
  	funding_goal: rand(100000) + 100000,
  	funding_date: Date.today + (25 + rand(5)).days,
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

(5 + rand(15)).times do
  projects << bad_music.projects.create!(
    title: "Stop that Band You Hate",
    creator_id: users.sample.id,
    category_featured: [false, false, false, false, true].sample,
    funding_goal: rand(200000) + 100000,
    funding_date: Date.today + (30 + rand(15)).days,
    project_blurb: "Don't want to hear a new album from"\
      " that band you hate? Give us enough money and we'll"\
      " skip releasing the album entirely and spare you nine"\
      " months of hearing only that on the radio on infinite"\
      " loop!"
    project_description: "Hey there everyone, we're that"\
    " band you really hate! "
  )
end

going_out
going_out
airplanes
social_media
bosses
coworkers


1000.times do
  reward = rewards.sample
	reward.pledges.create!(
	  user_id: users.sample.id,
		pledge_amount: rand(1000) + 1 + (rand(100).to_f / 100)
	)
end
