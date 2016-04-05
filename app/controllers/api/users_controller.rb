class Api::UsersController < ApplicationController

  # FINDTAG this also needs to not return a generic user hash

  def create
    user_params = params[:user]
    # make sure email isn't already taken
    if User.where(email: user_params[:email]).any?
      render text: "email_taken", status: 401
    else
      user = User.create(
        name: user_params[:name],
        email: user_params[:email],
        password: user_params[:pasword]
      )
      if user.save
        render json: user
      else
        render text: "user_save_error", status: 401
      end
    end
  end

end
