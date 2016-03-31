json.extract! project, :id, :title, :category_featured, :funding_goal,
  :funding_date, :project_blurb

json.category project.category.name
json.subcategory project.subcategory.name
