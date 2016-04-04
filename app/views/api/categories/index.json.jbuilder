json.array!(@categories) do |category|
  json.id category.id
  json.name category.name
  json.name_param category.name.underscore.gsub(" ", "_")
  json.subcategories category.subcategories do |subcategory|
    json.id subcategory.id
    json.name subcategory.name.titleize
    json.name_param subcategory.name.underscore.gsub(" ", "_")
  end
end
