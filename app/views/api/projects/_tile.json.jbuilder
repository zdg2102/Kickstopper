json.extract! project, :id, :title, :category_featured, :funding_goal,
  :funding_date, :project_blurb

if project.main_image
  json.main_image_url asset_path(project.main_image.picture.url(:original))
else
  json.main_image_url ""
end

json.creator_name project.creator.name
json.amount_pledged project.amount_pledged
