json.extract! project, :id, :title, :category_featured,
  :funding_date, :project_blurb, :project_description

json.creator_name project.creator.name
json.creator_num_backed project.creator.pledges.size
json.creator_num_projects project.creator.projects.size
json.amount_pledged project.dollar_formatted(project.amount_pledged)
json.funding_goal project.int_dollar_formatted(project.funding_goal)
json.backer_count project.int_formatted(project.backer_count)

if project.images
  found_main, found_secondary = nil, nil
  project.images.each do |img|
    found_main = img if img.use_type == "project_main"
    found_secondary = img if img.use_type == "project_secondary"
  end
  if found_main
    json.main_image_url asset_path(found_main.picture.url(:original))
  else
    json.main_image_url ""
  end
  if found_secondary
    json.secondary_image_url asset_path(found_secondary.picture.url(:original))
  else
    json.secondary_image_url ""
  end
else
  json.main_image_url ""
  json.secondary_image_url ""
end

json.rewards project.rewards do |reward|
  json.id reward.id
  json.title reward.title
  json.minimum_pledge reward.minimum_pledge
  json.formatted_minimum_pledge project.int_dollar_formatted(reward
    .minimum_pledge)
  json.description reward.description
end
