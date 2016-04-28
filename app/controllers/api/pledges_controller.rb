class Api::PledgesController < ApplicationController

  def create
    Stripe.api_key = ENV["stripe_secret_test_key"]
    pledge_params = params[:pledge]
    if pledge_params && pledge_params[:checkoutId] &&
      pledge_params[:stripeToken]
      checkout_id = pledge_params[:checkoutId]
      stripe_token = pledge_params[:stripeToken]
      checkout = Checkout.find(checkout_id)
      begin
        customer = Stripe::Customer.create(
          :source => stripe_token,
          :metadata => {
            "user_id" => checkout.user_id,
            "reward_id" => checkout.reward_id,
            "pledge_amount" => checkout.pledge_amount
          }
        )
      rescue Stripe::StripeError => e
        render json: {}, status: 418
        return
      end
      # if Stripe successfully created a customer, create a new pledge
      pledge = Pledge.create(
        user_id: checkout.user_id,
        reward_id: checkout.reward_id,
        pledge_amount: checkout.pledge_amount,
        stripe_customer_id: customer.id
      )
      if pledge.save
        # if the pledge was successfully created, destroy the checkout
        checkout.destroy
        render json: {}, status: 200
      else
        render json: {}, status: 400
      end
    else
      render json: {}, status: 400
    end
  end
end
