class GenerateSeeds

  def initialize(seed_count, title = nil)
    @seed_count = seed_count
    @title = title
  end

  def generate_new_seeds
    # generates all seeds for projects, rewards, and pledges

    # set up files for image attachments
    parrot_guy_main = File.open('app/assets/images/parrot-guy-main.jpg')
    parrot_guy_secondary =
      File.open('app/assets/images/parrot-guy-secondary.jpg')
    no_party_main = File.open('app/assets/images/no-party-main.jpg')
    no_party_secondary =
      File.open('app/assets/images/no-party-secondary.jpg')
    dog_main = File.open('app/assets/images/dog-main.jpg')
    dog_secondary = File.open('app/assets/images/dog-secondary.jpg')
    news_main = File.open('app/assets/images/news-main.jpg')
    news_secondary = File.open('app/assets/images/news-secondary.jpg')
    that_band_main = File.open('app/assets/images/that-band-main.jpg')
    that_band_secondary =
      File.open('app/assets/images/that-band-secondary.jpg')
    theater_baby_main =
      File.open('app/assets/images/theater-baby-main.jpg')
    theater_baby_secondary =
      File.open('app/assets/images/theater-baby-secondary.jpg')
    seatmate_main = File.open('app/assets/images/seatmate-main.jpg')
    seatmate_secondary =
      File.open('app/assets/images/seatmate-secondary.jpg')
    facebook_main = File.open('app/assets/images/facebook-main.jpg')
    facebook_secondary =
      File.open('app/assets/images/facebook-secondary.jpg')
    weekend_main = File.open('app/assets/images/weekend-main.jpg')
    weekend_secondary =
      File.open('app/assets/images/weekend-secondary.jpg')
    artsy_main = File.open('app/assets/images/artsy-main.jpg')
    artsy_secondary = File.open('app/assets/images/artsy-secondary.jpg')
    thief_main = File.open('app/assets/images/thief-main.jpg')
    thief_secondary = File.open('app/assets/images/thief-secondary.jpg')
    play_main = File.open('app/assets/images/play-main.jpg')
    play_secondary = File.open('app/assets/images/play-secondary.jpg')
    recliner_main = File.open('app/assets/images/recliner-main.jpg')
    recliner_secondary = File
      .open('app/assets/images/recliner-secondary.jpg')


    # set up the non-randomized info for each project in a hash, so
    # the project duplicates can be created in a random order
    projects_info = []

    parrot_guy_info = {
    	subcategory: Subcategory.find_by(name: "Weird Neighbors"),
    	title: "Stop the Parrot Guy",
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
    		" a wonderful, parrot-free building.",
      rewards: [],
    	main_image: parrot_guy_main,
    	secondary_image: parrot_guy_secondary
    }

    parrot_guy_reward_one_info = {
    	title: "Good Neighbor Tier",
    	description: "At this tier, the next time you move, I will "\
    		" tell your new neighbors nice things about what a good"\
    		" neighbor you were (regardless of if it was true or not)."
    }

    parrot_guy_reward_two_info = {
    	title: "True Parrot Hater Tier",
    	description: "At this tier, I will make you a hat with "\
    		" a custom message on it about how much you hate parrots,"\
    		" so any parrots you encounter in the future will know"\
    		" not to annoy you."
    }

    parrot_guy_info[:rewards] << parrot_guy_reward_one_info
    parrot_guy_info[:rewards] << parrot_guy_reward_two_info
    projects_info << parrot_guy_info

    no_party_info = {
    	subcategory: Subcategory.find_by(name: "Loud Neighbors"),
    	title: "No Party This Weekend",
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
      rewards: [],
    	main_image: no_party_main,
    	secondary_image: no_party_secondary
    }

    no_party_reward_one_info = {
      title: "Cleanup Tier",
      description: "At this tier, we will make sure the next time"\
        " we do have a party not to leave piles of mysteriously"\
        " appearing random trash outside your door."
    }

    no_party_reward_two_info = {
      title: "Song Skipper Tier",
      description: "At this tier, the next time we have a party,"\
        " you get the privilege of calling us angrily to have us turn"\
        " the music down, and we'll actually listen (for the length"\
        " of one song)."
    }

    no_party_reward_three_info = {
      title: "Do Unto Others Tier",
      description: "At this tier, the next time we have a party,"\
        " we will wait to do it until you're out of town for the"\
        " weekend, and then have a extra loud one so all the other"\
        " neighbors have to deal with it while you're far away relaxing."
    }

    no_party_info[:rewards] << no_party_reward_one_info
    no_party_info[:rewards] << no_party_reward_two_info
    no_party_info[:rewards] << no_party_reward_three_info
    projects_info << no_party_info

    dog_info = {
    	subcategory: Subcategory.find_by(name: "Loud Neighbors"),
    	title: "Shut the Dog Up",
    	project_blurb: "Buy that dog some toys so it stops barking",
    	project_description: "Why would anybody buy a little yippy dog?"\
        " I have no idea. Yet there it is, and I think everyone within five"\
        " blocks can hear it. I think it probably makes those noises all"\
        " day because it's bored and has too much energy. And based on that"\
        " (faint, meager) hope, I'm using this Kickstopper to raise funds to"\
        " buy that dog more toys than it could possibly know what to do"\
        " with. Maybe that will finally tire it out so it stops barking...",
      rewards: [],
    	main_image: dog_main,
    	secondary_image: dog_secondary
    }

    dog_reward_one_info = {
      title: "Happy Ears Tier",
      description: "At this tier, you get the satisfaction of"\
        " (hopefully) not having to hear that dog yipping all day"\
        " anymore."
    }

    dog_reward_two_info = {
      title: "Guaranteed Results Tier",
      description: "At this tier, I will buy you a very expensive"\
        " set of earplugs, so that even if my plan fails and the dog"\
        " doesn't quiet down, you're still guaranteed peace and quiet."
    }

    dog_info[:rewards] << dog_reward_one_info
    dog_info[:rewards] << dog_reward_two_info
    projects_info << dog_info

    news_info = {
    	subcategory: Subcategory.find_by(name: "Depressing News"),
    	title: "No Depressing News",
    	project_blurb: "Avoid having to see depressing news"\
        " stories every day!",
    	project_description: "Isn't seeing what's in the news every"\
    	  " day depressing? Wouldn't you like to avoid some of that"\
    		" in your life? For just that reason, we your friends here"\
    		" at CNN, MSNBC, the New York Times, and even all the way down"\
    		" to Buzzfeed are offering this special Kickstopper project."\
    		" Just give us money, and we'll give you a day where we don't"\
    		" show you anything that makes you want to cover your eyes"\
        " to avoid seeing the state of humanity!",
      rewards: [],
    	main_image: news_main,
    	secondary_image: news_secondary
    }

    news_reward_one_info = {
      title: "Peaceful Day Tier",
      description: "At this tier, you get a full day of not seeing"\
        " anything incredibly depressing in the news."
    }

    news_reward_two_info = {
      title: "Happy Animals Tier",
      description: "At this tier, you get the privilege of choosing"\
        " a time (the next presidential debate? the next celebrity scandal?)"\
        " at which all news coverage will be replaced for one hour by videos"\
        " of happy puppies or kittens (your choice) frolicking in a meadow."
    }

    news_info[:rewards] << news_reward_one_info
    news_info[:rewards] << news_reward_two_info
    projects_info << news_info

    that_band_info = {
    	subcategory: Subcategory.find_by(name: "Bad Music"),
    	title: "Stop that Band You Hate",
    	project_blurb: "Don't want to hear a new album from"\
        " that band you hate? Give us enough money and we'll"\
        " skip releasing the album entirely and spare you nine"\
        " months of hearing only that on the radio on infinite"\
        " loop!",
    	project_description: "Hey there everyone, we're that"\
        " band you really hate! Don't you find it incredibly frustrating"\
        " how every time we come out with a new album or single, you hear"\
        " nothing but those one or two songs on endless cycle on every radio"\
        " station and in every department store until you wish your ears"\
        " would fall off? Well we're offering a special opportunity! If we reach"\
        " our funding goal on this Kickstopper, we'll skip releasing our next"\
        " album, and give your ears a break!",
      rewards: [],
    	main_image: that_band_main,
    	secondary_image: that_band_secondary
    }

    that_band_reward_one_info = {
      title: "Silly Hat Tier",
      description: "At this tier, we'll write your name on the incredibly"\
        " large and silly hat our lead singer will wear at the press conference"\
        " announcing that we won't be releasing our next album."
    }

    that_band_reward_two_info = {
      title: "Word Salad Tier",
      description: "At this tier, on our next-next album (after the one we're"\
        " skipping), you can choose one random word in one song and replace"\
        " it with any word of your choosing, making the song totally nonsensical."
    }

    that_band_reward_three_info = {
      title: "Ear Worm Tier",
      description: "At this tier, we will follow around someone of your"\
        " choosing for one day and sing all our most irritating songs into"\
        " his/her ears personally!"
    }

    that_band_info[:rewards] << that_band_reward_one_info
    that_band_info[:rewards] << that_band_reward_two_info
    that_band_info[:rewards] << that_band_reward_three_info
    projects_info << that_band_info

    theater_baby_info = {
    	subcategory: Subcategory.find_by(name: "Going Out"),
    	title: "Quiet the Baby in the Movie Theater",
    	project_blurb: "Want to actually be able to hear the movie you"\
        " paid to watch?",
    	project_description: "Hi there, we're the parents of that baby"\
        " in the fourth row of the theater that hasn't stopped crying"\
        " for the entire movie. At this point, we're completely immune"\
        " to the sound, but we know you aren't, so we're offering this"\
        " Kickstopper. If we reach our funding goal, we'll give him"\
        " a bottle so he stops crying and you can watch your movie in peace."\
        " If we reach our stretch goal, we'll leave the theater altogether!",
      rewards: [],
    	main_image: theater_baby_main,
    	secondary_image: theater_baby_secondary
    }

    theater_baby_reward_one_info = {
      title: "Planning Ahead Tier",
      description: "At this tier, we'll buy you a set of noise-canceling"\
      " headphones, for the next time you're stuck in a closed space with"\
      " a screaming baby."
    }

    theater_baby_info[:rewards] << theater_baby_reward_one_info
    projects_info << theater_baby_info

    seatmate_info = {
    	subcategory: Subcategory.find_by(name: "Airplanes"),
    	title: "Escape Talking to the Chatty Seatmate",
    	project_blurb: "Avoid hearing any more weird, rambling vacation"\
        " stories!",
    	project_description: "Hi there, I'm that person in the seat next"\
        " to you on the very long plane ride who's decided to become your"\
        " new best friend. I know it's a long flight and you just want"\
        " to sleep, so I'm offering this Kickstopper. If I reach my funding"\
        " goal, I'll stop showing you vacation pictures and making comments"\
        " comparing the weather in my home city to your home city, and just"\
        " let you watch your in-flight movie in peace.",
      rewards: [],
    	main_image: seatmate_main,
    	secondary_image: seatmate_secondary
    }

    seatmate_reward_one_info = {
      title: "Comfortable Neck Tier",
      description: "At this tier, I'll lend you my neck pillow so you can"\
        " sleep through the rest of this flight more easily."
    }

    seatmate_reward_two_info = {
      title: "Turnabout Tier",
      description: "At this tier, you can be the chatty seatmate, and I'll"\
        " listen to you talk about your boring hobby that none of your friends"\
        " are interested in."
    }

    seatmate_info[:rewards] << seatmate_reward_one_info
    seatmate_info[:rewards] << seatmate_reward_two_info
    projects_info << seatmate_info

    facebook_info = {
    	subcategory: Subcategory.find_by(name: "Social Media"),
    	title: "No More Spamming Your Feed",
    	project_blurb: "No more long, ill-informed, caps-lock posts about"\
        " political issues!",
    	project_description: "This is your cousin, the one who makes"\
        " at least five social media posts a day about crazy political"\
        " conspiracy theories that no sane person could possibly believe."\
        " If I reach my funding goal, I will give up social media entirely."\
        " If I reach my stretch goal, I will also go read some normal news"\
        " sources to teach me to get past my conspiracy theories.",
      rewards: [],
    	main_image: facebook_main,
    	secondary_image: facebook_secondary
    }

    facebook_reward_one_info = {
      title: "Named Contributor Tier",
      description: "At this tier, I will include your name in the list of"\
        " contributors, so all our other relatives will know who to thank"\
        " at the next family gathering."
    }

    facebook_reward_two_info = {
      title: "Somewhere Else Tier",
      description: "At this tier, I will adopt a social media platform"\
        " you don't use and start making constant posts there about"\
        " political opinions of your choice."
    }

    facebook_info[:rewards] << facebook_reward_one_info
    facebook_info[:rewards] << facebook_reward_two_info
    projects_info << facebook_info

    weekend_info = {
    	subcategory: Subcategory.find_by(name: "Bosses"),
    	title: "Avoid Working the Weekend",
    	project_blurb: "No more getting asked to work weekends",
    	project_description: "This is your boss, the one who always asks"\
        " you to come in on weekends and then gives you a dirty look"\
        " when you try to get out of it. I'm offering this Kickstopper"\
        " to give you a chance to escape and enjoy your weekend.",
      rewards: [],
    	main_image: weekend_main,
    	secondary_image: weekend_secondary
    }

    weekend_reward_one_info = {
      title: "Bullet Dodged Tier",
      description: "At this tier, you get one get-out-of-jail-free"\
        " card for avoiding working a weekend."
    }

    weekend_reward_two_info = {
      title: "Scot Free Tier",
      description: "At this tier, you get out of ever having to come in"\
        " on a weekend again!"
    }

    weekend_reward_three_info = {
      title: "Not My Problem Tier",
      description: "At this tier, not only do you not have to come in"\
        " on the weekend, you get to choose one person in the office"\
        " and I'll make them come in this weekend instead."
    }

    weekend_info[:rewards] << weekend_reward_one_info
    weekend_info[:rewards] << weekend_reward_two_info
    weekend_info[:rewards] << weekend_reward_three_info
    projects_info << weekend_info

    artsy_info = {
      subcategory: Subcategory.find_by(name: "Weird Neighbors"),
      title: "Real Job for Artsy Cousin",
      project_blurb: "Tired of hearing your cousin explain how"\
        " his interpretive dance expresses 'the truth of reality'?"\
        " Force him to learn the truth of a cubicle!",
      project_description: "This is your aunt, and I'm worried"\
        " about your cousin. He claimed that staying on my couch"\
        " was only temporary, but now he's saying that he needs"\
        " to express his independent spirit, which apparently means"\
        " going to an art gallery every weekend, covering himself"\
        " in glue, and making chicken noises. And spending the rest"\
        " of the week mooching cash from me. With the money I raise"\
        " from this Kickstopper, I plan to bribe his performance"\
        " group to kick him out, so he'll finally be forced to get"\
        " a real job.",
      rewards: [],
      main_image: artsy_main,
      secondary_image: artsy_secondary
    }

    artsy_reward_one_info = {
      title: "Vaudevillian Tier",
      description: "At this tier, I will provide you one tomato"\
      " or other squishy and overripe fruit at his final performance"\
      " for you to throw at the stage."
    }

    artsy_reward_two_info = {
      title: "Monologue Tier",
      description: "At this tier, I will force him to sit and"\
      " listen while you lecture on a topic that he finds as"\
      " irritating as his lectures on the moral inferiority of"\
      " corporate work."
    }

    artsy_reward_three_info = {
      title: "Day in the Life Tier",
      description: "At this tier, in preparation for his"\
      " upcoming life change, you get to force him to go through"\
      " your workday for one full day, and experience what it's"\
      " like to actually work for a living."
    }

    artsy_info[:rewards] << artsy_reward_one_info
    artsy_info[:rewards] << artsy_reward_two_info
    artsy_info[:rewards] << artsy_reward_three_info
    projects_info << artsy_info

    thief_info = {
      subcategory: Subcategory.find_by(name: "Coworkers"),
      title: "Stop the Refrigerator Thief",
      project_blurb: "Stop the mysterious bandit stealing"\
        " our lunches from the fridge!",
      project_description: "We live every day under a shadowy"\
        " threat. Someone, or perhaps something, somewhere, in"\
        " the mysterious wilderness between the copy machine and"\
        " the elevator bank, is stealing our lunches from the"\
        " fridge. An evil brigand who knows neither friend nor"\
        " foe, instead knowing only the foul hunger that drives him to"\
        " pilfer that which does not belong to him. And we all"\
        " know it's you, Steve, so stop trying to deny it.",
      rewards: [],
      main_image: thief_main,
      secondary_image: thief_secondary
    }

    thief_reward_one_info = {
      title: "Great Knight Tier",
      description: "At this tier, we will present you with a sword,"\
        " worthy of a knight who defeated such a beast as this."\
        " Except your sword will be made of stryofoam, because"\
        " anything else is too expensive and will get us in trouble"\
        " with HR."
    }

    thief_reward_two_info = {
      title: "Lunchlord Tier",
      description: "At this tier, for having saved all of our"\
        " lunches from certain doom, you will be entitled to"\
        " a few bites of whichever lunch in the fridge is best"\
        " that day."
    }

    thief_info[:rewards] << thief_reward_one_info
    thief_info[:rewards] << thief_reward_two_info
    projects_info << thief_info

    play_info = {
      subcategory: Subcategory.find_by(name: "Bad Music"),
      title: "Escape the Elementary School Play",
      project_blurb: "Avoid having to get excited over your"\
        " precious little angels' off-key singing",
      project_description: "Hello parents, this is your"\
        " children's school. It's once again getting close to"\
        " the annual school play, which I know you're all thrilled"\
        " about. So thrilled, in fact, to hear their voices"\
        " come together in an ear-splitting monotone shout as half of them"\
        " forget the words and the other half come up with new"\
        " ones on the spot, that we're sure you'll be willing to"\
        " pay up to have us forget the whole thing was ever"\
        " planned in the first place.",
      rewards: [],
      main_image: play_main,
      secondary_image: play_secondary
    }

    play_reward_one_info = {
      title: "Good Parent Tier",
      description: "At this tier, we'll have your kid make"\
        " some kind of art project, so you can hang it on the"\
        " fridge to feel less guilty about not wanting to go to"\
        " the play."
    }

    play_reward_two_info = {
      title: "Good Excuse Tier",
      description: "At this tier, we'll bribe your boss into"\
        " sending you on a work trip, so you'll have an excuse"\
        " to miss the next school play too."
    }

    play_info[:rewards] << play_reward_one_info
    play_info[:rewards] << play_reward_two_info
    projects_info << play_info

    recliner_info = {
      subcategory: Subcategory.find_by(name: "Airplanes"),
      title: "Stop the Reclining Seat Guy",
      project_blurb: "Protect your seat! End the tyranny of"\
        " excessive recliners and chair back kickers!",
      project_description: "For too long, my fellow airplane"\
        " passengers, we have been meek and cowed in our shared"\
        " injustice. For too long, we have allowed the seats in"\
        " front of and behind us to ruin our flights. But no"\
        " longer! For we are awakened, and we are mighty!"\
        " And we're pooling our resources here to buy devices"\
        " to install on airplane seats that play voice recordings"\
        " making passive-aggressive comments when people lean back"\
        " too far.",
      rewards: [],
      main_image: recliner_main,
      secondary_image: recliner_secondary
    }

    recliner_reward_one_info = {
      title: "Champion Tier",
      description: "At this tier, you get one of our"\
        " passive-aggressive voice playback devices to install"\
        " on an airplane seat of your choice, striking a blow"\
        " against tyranny like the champion of justice you are."
    }

    recliner_reward_two_info = {
      title: "Rearguard Tier",
      description: "At this tier, you get one of our"\
        " prototype devices to defend against seat back kickers."\
        " It installs in the back of their seat, and every time"\
        " they kick your seat, it kicks their seat."
    }

    recliner_info[:rewards] << recliner_reward_one_info
    recliner_info[:rewards] << recliner_reward_two_info
    projects_info << recliner_info

    # one more going out
    # one more coworkers

    # Create projects from the project info, randomizing all other values
    @seed_count.times do

      # for convenience, option to only populate duplicates
      # of one particular project
      if @title
        current_project_info = projects_info
          .find { |info| info[:title] == @title }
      else
        # otherwise take a random one each time
        current_project_info = projects_info.sample
      end

    	# funding goal is always forced to be a multiple of 10, to look
    	# more like a real goal
    	new_project = current_project_info[:subcategory].projects
    	  .create!(
        title: current_project_info[:title],
    		creator_id: User.all.sample.id,
    		category_featured: rand(7) == 0,
        funding_goal: 500 + (rand(100) * 10),
        funding_date: Date.today + (3 + rand(40)).days,
    		project_blurb: current_project_info[:project_blurb],
    		project_description: current_project_info[:project_description]
    	)

    	new_project.images.create!(
    	  picture: current_project_info[:main_image],
    		use_type: :project_main
    	)
    	new_project.images.create!(
    	  picture: current_project_info[:secondary_image],
    		use_type: :project_secondary
    	)

    	current_project_info[:rewards].each do |reward|
        # reward minimum pledges are also forced to be a multiple
    		#  of 10
    		new_project.rewards.create!(
          minimum_pledge: 20 + (rand(18) * 10),
    			title: reward[:title],
    			description: reward[:description]
    		)
    	end

    	# create pledges
    	rand(7).times do
        reward = new_project.rewards.sample
    		reward.pledges.create!(
    		  user_id: User.all.sample.id,
    			pledge_amount: reward.minimum_pledge +
    			  rand(50) + (rand(100).to_f / 100)
    		)
    	end
    end
  end

end
