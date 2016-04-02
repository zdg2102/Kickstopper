class Api::SessionsController < ApplicationController

  def current
    if logged_in?
      render json: current_user
    else
      render json: { "message" => "Not logged in" }, status: 401
    end
  end

  def create
    user_params = params[:user]
    if user_params
      user = User.find_by_credentials(params[:email], params[:password])
    end
    if user && user.is_password?(params[:password])
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
