class OmniAuthController < ApplicationController

  # NOTE look into switching over to Facebook SDK method rather
  # than routes method, so we can control the redirect

  def facebook
    user = User.find_or_create_by_auth_hash(auth_hash)
    login!(user)
    redirect_to "/"
  end

  def auth_hash
    request.env['omniauth.auth']
  end

end
