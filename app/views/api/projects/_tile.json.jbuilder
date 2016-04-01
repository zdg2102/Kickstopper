json.extract! project, :id, :title, :category_featured, :funding_goal,
  :funding_date, :project_blurb

json.category project.category.name
json.subcategory project.subcategory.name
json.creator_name project.creator.name
json.amount_pledged project.amount_pledged

json.backer_count project.backer_count
