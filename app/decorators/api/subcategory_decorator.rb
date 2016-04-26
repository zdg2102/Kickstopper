class Api::SubcategoryDecorator < Draper::Decorator
  delegate_all

  decorates Subcategory

  def param_name
    # snake case version of name used for passing in queries
    name.underscore.gsub(" ", "_")
  end

end
