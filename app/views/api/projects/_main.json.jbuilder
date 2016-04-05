json.extract! project, :id, :title, :category_featured, :funding_goal,
  :funding_date, :project_blurb, :project_description

json.creator_name project.creator.name
json.creator_num_backed project.creator.pledges.size
json.creator_num_projects project.creator.projects.size
json.amount_pledged project.amount_pledged
json.backer_count project.backer_count

json.rewards project.rewards do |reward|
  json.id reward.id
  json.title reward.title
  json.minimum_pledge reward.minimum_pledge
  json.description reward.description
end
