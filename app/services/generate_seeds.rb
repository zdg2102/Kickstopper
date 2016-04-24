class GenerateSeeds

  def initialize(seed_count)
    @seed_count = seed_count
  end

  def generate_new_seeds
    # for purposes of presentation and displaying enough data
    # to sort, explore, and filter, need to generate new seeds
    # every time old projects reach their funding date and
    # are destroyed

    # set up files for image attachments

    parrot_guy_main = File.open('app/assets/images/parrot-guy-main.jpg')
    parrot_guy_secondary =
      File.open('app/assets/images/parrot-guy-secondary.jpg')
    no_party_main = File.open('app/assets/images/no-party-main.jpg')
    no_party_secondary = File.open('app/assets/images/no-party-secondary.jpg')
    dog_main = File.open('app/assets/images/dog-main.jpg')
    dog_secondary = File.open('app/assets/images/dog-secondary.jpg')
    news_main = File.open('app/assets/images/news-main.jpg')
    news_secondary = File.open('app/assets/images/news-secondary.jpg')
    that_band_main = File.open('app/assets/images/that-band-main.jpg')
    that_band_secondary = File.open('app/assets/images/that-band-secondary.jpg')
    theater_baby_main = File.open('app/assets/images/theater-baby-main.jpg')
    theater_baby_secondary =
      File.open('app/assets/images/theater-baby-secondary.jpg')
    seatmate_main = File.open('app/assets/images/seatmate-main.jpg')
    seatmate_secondary = File.open('app/assets/images/seatmate-secondary.jpg')
    facebook_main = File.open('app/assets/images/facebook-main.jpg')
    facebook_secondary = File.open('app/assets/images/facebook-secondary.jpg')
    weekend_main = File.open('app/assets/images/weekend-main.jpg')
    weekend_secondary = File.open('app/assets/images/weekend-secondary.jpg')

    # set up the non-randomized info for each project in a hash, so
    # the project duplicates can be created in a random order

    projects_info = []

    parrot_guy_info = {
    	subcategory: weird_neighbors,
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

    parrot_reward_one_info = {
    	title: "Good Neighbor Tier",
    	description: "At this tier, the next time you move, I will "\
    		" tell your new neighbors nice things about what a good"\
    		" neighbor you were (regardless of if it was true or not)."
    }

    parrot_reward_two_info = {
    	title: "True Parrot Hater Tier",
    	description: "At this tier, I will make you a hat with "\
    		" a custom message on it about how much you hate parrots,"\
    		" so any parrots you encounter in the future will know"\
    		" not to annoy you."
    }

    parrot_guy_info[:rewards] << parrot_reward_one_info
    parrot_guy_info[:rewards] << parrot_reward_two_info
    projects_info << parrot_guy_info

    # Create projects from the project info, randomizing all other values

    94.times do
      current_project_info = projects_info.sample
    	# funding goal is always forced to be a multiple of 10, to look
    	# more like a real goal
    	new_project = current_project_info[:subcategory].projects
    	  .create!(
        title: current_project_info[:title],
    		creator_id: users.sample.id,
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
    	rand(5).times do
        reward = new_project.rewards.sample
    		reward.pledges.create!(
    		  user_id: users.sample.id,
    			pledge_amount: reward.minimum_pledge +
    			  rand(50) + (rand(100).to_f / 100)
    		)
    	end
    end
  end

end
