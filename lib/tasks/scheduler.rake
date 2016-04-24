desc "Tasks to be run by Heroku scheduler"
task scheduled_handle_funding_date: :environment do
  deadline_projects = Project
    .where("projects.funding_date <= :today", today: Date.today)
  deadline_projects.each do |project|
    project.handle_funding_date
  end
  new_seeds = GenerateSeeds.new(deadline_projects.length)
  new_seeds.generate_new_seeds
end
