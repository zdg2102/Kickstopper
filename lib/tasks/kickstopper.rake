namespace :kickstopper do
  desc "Handles projects that have reached their funding date"
  task handle_funding_date_projects: :environment do
    deadline_projects = Project
      .where("projects.funding_date <= :today", today: Date.today)
    deadline_projects.each do |project|
      project.handle_funding_date
    end
    # for purposes of presentation and displaying enough data
    # to sort, explore, and filter, need to generate new seeds
    # every time old projects reach their funding date and
    # are destroyed
    new_seeds = GenerateSeeds.new(deadline_projects.length)
    new_seeds.generate_new_seeds
  end
end
