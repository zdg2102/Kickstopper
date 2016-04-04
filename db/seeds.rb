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
      " neighbor you were (regardless of if it was true or not)."
  )

  rand(8).times do
    parrot_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 50 + rand(100) + (rand(100).to_f / 100)
    )
  end

  parrot_reward_two = parrot_guy.rewards.create!(
    minimum_pledge: 500,
    title: "True Parrot Hater Tier",
    description: "At this tier, I will make you a hat with "\
      " a custom message on it about how much you hate parrots,"\
      " so any parrots you encounter in the future will know"\
      " not to annoy you."
  )

  rand(3).times do
    parrot_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 500 + rand(300) + (rand(100).to_f / 100)
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
      pledge_amount: 50 + rand(100) + (rand(100).to_f / 100)
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
      pledge_amount: 500 + rand(300) + (rand(100).to_f / 100)
    )
  end

  party_reward_three = no_party.rewards.create!(
    minimum_pledge: 1000,
    title: "Do Unto Others Tier",
    description: "At this tier, the next time we have a party,"\
      " we will wait to do it until you're out of town for the"\
      " weekend, and then have a extra loud one so all the other"\
      " neighbors have to deal with it while you're far away relaxing."
  )

  rand(2).times do
    party_reward_three.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 1000 + rand(500) + (rand(100).to_f / 100)
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
      " I have no idea. Yet there it is, and I think everyone within five"\
      " blocks can hear it. I think it probably makes those noises all"\
      " day because it's bored and has too much energy. And based on that"\
      " (faint, meager) hope, I'm using this Kickstopper to raise funds to"\
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
      pledge_amount: 20 + rand(30) + (rand(100).to_f / 100)
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
      pledge_amount: 100 + rand(100) + (rand(100).to_f / 100)
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

  news_reward_one = news.rewards.create!(
    minimum_pledge: 50,
    title: "Peaceful Day Tier",
    description: "At this tier, you get a full day of not seeing"\
      " anything incredibly depressing in the news."
  )

  rand(100).times do
    news_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 50 + rand(30) + (rand(100).to_f / 100)
    )
  end

  news_reward_two = news.rewards.create!(
    minimum_pledge: 10000,
    title: "Happy Animals Tier",
    description: "At this tier, you get the privilege of choosing"\
      " a time (the next presidential debate? the next celebrity scandal?)"\
      " at which all news coverage will be replaced for one hour by videos"\
      " of happy puppies or kittens (your choice) frolicking in a meadow."
  )

  rand(10).times do
    news_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 10000 + rand(5000) + (rand(100).to_f / 100)
    )
  end

end

(5 + rand(15)).times do
  that_band = bad_music.projects.create!(
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
      " band you really hate! Don't you find it incredibly frustrating"\
      " how every time we come out with a new album or single, you hear"\
      " nothing but those one or two songs on endless cycle on every radio"\
      " station and in every department store until you wish your ears"\
      " would fall off? Well we're offering a special opportunity! If we reach"\
      " our funding goal on this Kickstopper, we'll skip releasing our next"\
      " album, and give your ears a break!"
  )

  band_reward_one = that_band.rewards.create!(
    minimum_pledge: 10,
    title: "Silly Hat Tier",
    description: "At this tier, we'll write your name on the incredibly"\
      " large and silly hat our lead singer will wear at the press conference"\
      " announcing that we won't be releasing our next album."
  )

  rand(1000).times do
    band_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 10 + rand(30) + (rand(100).to_f / 100)
    )
  end

  band_reward_two = that_band.rewards.create!(
    minimum_pledge: 500,
    title: "Word Salad Tier",
    description: "At this tier, on our next-next album (after the one we're"\
      " skipping), you can choose one random word in one song and replace"\
      " it with any word of your choosing, making the song totally nonsensical."
  )

  rand(20).times do
    band_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 500 + rand(300) + (rand(100).to_f / 100)
    )
  end

  band_reward_three = that_band.rewards.create!(
    minimum_pledge: 50000,
    title: "Ear Worm Tier",
    description: "At this tier, we will follow around someone of your"\
      " choosing for one day and sing all our most irritating songs into"\
      " his/her ears personally!"
  )

  rand(2).times do
    band_reward_three.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 50000 + rand(10000) + (rand(100).to_f / 100)
    )
  end

end

(5 + rand(15)).times do
  theater_baby = going_out.projects.create!(
    title: "Quiet the Baby in the Movie Theater",
  	creator_id: users.sample.id,
  	category_featured: [false, false, false, false, true].sample,
  	funding_goal: rand(500) + 200,
  	funding_date: Date.today + (4 + rand(3)).days,
  	project_blurb: "Want to actually be able to hear the movie you"\
      " paid to watch?"
  	project_description: "Hi there, we're the parents of that baby"\
      " in the fourth row of the theater that hasn't stopped crying"\
      " for the entire movie. At this point, we're completely immune"\
      " to the sound, but we know you aren't, so we're offering this"\
      " Kickstopper. If we reach our funding goal, we'll give him"\
      " a bottle so he stops crying and you can watch your movie in peace."\
      " If we reach our stretch goal, we'll leave the theater altogether!"
  )

  theater_baby_reward_one = theater_baby.rewards.create!(
    minimum_pledge: 50,
    title: "Planning Ahead Tier",
    description: "At this tier, we'll buy you a set of noise-canceling"\
    " headphones, for the next time you're stuck in a closed space with"\
    " a screaming baby."
  )

  rand(4).times do
    theater_baby_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 50 + rand(20) + (rand(100).to_f / 100)
    )
  end

end

# FINDTAG one more here

# (5 + rand(15)).times do
#   theater_baby = going_out.projects.create!(
#     title: "Quiet the Baby in the Movie Theater",
#   	creator_id: users.sample.id,
#   	category_featured: [false, false, false, false, true].sample,
#   	funding_goal: rand(500) + 200,
#   	funding_date: Date.today + (4 + rand(3)).days,
#   	project_blurb: "Want to actually be able to hear the movie you"\
#       " paid to watch?"
#   	project_description: "Hi there, we're the parents of that baby"\
#       " in the fourth row of the theater that hasn't stopped crying"\
#       " for the entire movie. At this point, we're completely immune"\
#       " to the sound, but we know you aren't, so we're offering this"\
#       " Kickstopper. If we reach our funding goal, we'll give him"\
#       " a bottle so he stops crying and you can watch your movie in peace."\
#       " If we reach our stretch goal, we'll leave the theater altogether!"
#   )
#
#   theater_baby_reward_one = theater_baby.rewards.create!(
#     minimum_pledge: 50,
#     title: "Planning Ahead Tier",
#     description: "At this tier, we'll buy you a set of noise-canceling"\
#     " headphones, for the next time you're stuck in a closed space with"\
#     " a screaming baby."
#   )
#
#   rand(4).times do
#     theater_baby_reward_one.pledges.create!(
#       user_id: users.sample.id,
#       pledge_amount: 50 + rand(20) + (rand(100).to_f / 100)
#     )
#   end
#
# end

(5 + rand(15)).times do
  seatmate = airplanes.projects.create!(
    title: "Escape Talking to the Chatty Seatmate",
    creator_id: users.sample.id,
    category_featured: [false, false, false, false, true].sample,
    funding_goal: rand(800) + 400,
    funding_date: Date.today + (4 + rand(3)).days,
    project_blurb: "Avoid hearing any more weird, rambling vacation"\
      " stories!"
    project_description: "Hi there, I'm that person in the seat next"\
      " to you on the very long plane ride who's decided to become your"\
      " new best friend. I know it's a long flight and you just want"\
      " to sleep, so I'm offering this Kickstopper. If I reach my funding"\
      " goal, I'll stop showing you vacation pictures and making comments"\
      " comparing the weather in my home city to your home city, and just"\
      " let you watch your in-flight movie in peace."
  )

  seatmate_reward_one = seatmate.rewards.create!(
    minimum_pledge: 20,
    title: "Comfortable Neck Tier",
    description: "At this tier, I'll lend you my neck pillow so you can"\
      " sleep through the rest of this flight more easily."
  )

  rand(7).times do
    seatmate_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 20 + rand(10) + (rand(100).to_f / 100)
    )
  end

  seatmate_reward_two = seatmate.rewards.create!(
    minimum_pledge: 80,
    title: "Turnabout Tier",
    description: "At this tier, you can be the chatty seatmate, and I'll"\
      " listen to you talk about your boring hobby that none of your friends"\
      " are interested in."
  )

  rand(5).times do
    seatmate_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 80 + rand(50) + (rand(100).to_f / 100)
    )
  end

end

(5 + rand(15)).times do
  facebook = social_media.projects.create!(
    title: "No More Spamming Your Feed",
    creator_id: users.sample.id,
    category_featured: [false, false, false, false, true].sample,
    funding_goal: rand(800) + 400,
    funding_date: Date.today + (10 + rand(20)).days,
    project_blurb: "No more long, ill-informed, caps-lock posts about"\
      " political issues!",
    project_description: "This is your cousin, the one who makes"\
      " at least five social media posts a day about crazy political"\
      " conspiracy theories that no sane person could possibly believe."\
      " If I reach my funding goal, I will give up social media entirely."\
      " If I reach my stretch goal, I will also go read some normal news"\
      " sources to teach me to get past my conspiracy theories."
  )

  facebook_reward_one = facebook.rewards.create!(
    minimum_pledge: 20,
    title: "Named Contributor Tier",
    description: "At this tier, I will include your name in the list of"\
      " contributors, so all our other relatives will know who to thank"\
      " at the next family gathering."
  )

  rand(20).times do
    facebook_reward_one.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 20 + rand(10) + (rand(100).to_f / 100)
    )
  end

  facebook_reward_two = facebook.rewards.create!(
    minimum_pledge: 500,
    title: "Somewhere Else Tier",
    description: "At this tier, I will adopt a social media platform"\
      " you don't use and start making constant posts there about"\
      " political opinions of your choice."
  )

  rand(4).times do
    facebook_reward_two.pledges.create!(
      user_id: users.sample.id,
      pledge_amount: 500 + rand(200) + (rand(100).to_f / 100)
    )
  end

end


bosses
coworkers
