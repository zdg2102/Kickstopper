json.extract! project, :id, :title, :category_featured, :funding_goal,
  :funding_date, :project_blurb

json.creator_name project.creator.name
json.amount_pledged project.amount_pledged
