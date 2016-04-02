class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= SessionToken
      .find_by(token_string: session[:session_token]).user
  end

  def logged_in?
    !current_user.nil?
  end

  def login!(user)
    new_token = user.session_tokens.create!
    session[:session_token] = new_token.token_string
  end

  def logout!
    if current_user
      current_token = SessionToken
        .find_by(token_string: session[:session_token])
      current_token.destroy
    end
    session[:session_token] = nil
  end

  private

  def ensure_logged_in
    render json: { "message" => "Must be logged in" }, status: 401
  end

  def ensure_logged_out
    render json: { "message" => "Already logged in" }, status: 401
  end

end
