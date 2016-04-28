class Api::UsersController < ApplicationController

  # NOTE need to replace user json with jbuilder view

  def create
    user_params = params[:user]
    # make sure email isn't already taken
    if User.where(email: user_params[:email]).any?
      render json: { "msg" => "Email already taken" }, status: 401
    else
      user = User.create(
        name: user_params[:name],
        email: user_params[:email],
        password: user_params[:pasword]
      )
      if user.save
        login!(user)
        render json: user
      else
        render json: { "msg" => "Could not save user" }, status: 400
      end
    end
  end

end
