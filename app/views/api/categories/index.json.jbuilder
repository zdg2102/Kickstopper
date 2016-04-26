json.array!(@categories) do |category|
  json.id category.id
  json.name category.name
  json.name_param category.param_name
  json.subcategories category.subcategories do |subcategory|
    subcategory = Api::SubcategoryDecorator.decorate(subcategory)
    json.id subcategory.id
    json.name subcategory.name.titleize
    json.name_param subcategory.param_name
  end
end
