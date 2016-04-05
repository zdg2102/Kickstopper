class OmniAuthController < ApplicationController

  # FINDTAG is there a way to let us do this such that we can get
  # them back to the right page if they were forced here by a redirect?

  def facebook
    user = User.find_or_create_by_auth_hash(auth_hash)
    login!(user)
    redirect_to "/"
  end

  def auth_hash
    request.env['omniauth.auth']
  end

end
