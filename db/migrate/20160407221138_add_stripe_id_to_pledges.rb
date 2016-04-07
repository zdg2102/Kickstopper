class AddStripeIdToPledges < ActiveRecord::Migration
  def change
    add_column :pledges, :stripe_customer_id, :string
    add_index :pledges, :stripe_customer_id
  end
end
