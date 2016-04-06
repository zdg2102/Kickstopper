json.extract! project, :id, :title, :category_featured, :funding_goal,
  :funding_date, :project_blurb

if project.images
  found_image = nil
  project.images.each do |img|
    main_image = img if img.use_type == "project_main"
  end
  if found_image
    json.main_image_url asset_path(found_image.picture.url(:original))
  else
    json.main_image_url ""
  end
else
  json.main_image_url ""
end
