class Api::SessionsController < ApplicationController

  # FINDTAG render json is not a long term good solution here, don't
  # send password digests

  def current
    if logged_in?
      render json: current_user
    else
      # pass an empty object to indicate not currently logged in
      render json: {}
    end
  end

  def create
    user_params = params[:user]
    if user_params
      user = User.find_by_credentials(
        user_params[:email],
        user_params[:password]
      )
    end
    if user && user.is_password?(user_params[:password])
      login!(user)
      render json: user
    else
      render json: { "message" => "Invalid credentials" }, status: 401
    end
  end

  def destroy
    logout!
    render json: {}
  end

end
