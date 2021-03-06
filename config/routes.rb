Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :projects, only: [:index, :show, :create, :update]
    resources :unlaunched_projects, only: [:show, :create, :update]
    get '/searches/search' => 'searches#search'
    resource :session, only: [:create, :destroy]
    get '/session/current' => 'sessions#current'
    resources :categories, only: [:index]
    resources :users, only: [:create]
    resources :checkouts, only: [:create, :show]
    resources :pledges, only: [:create]
  end

  get '/auth/facebook/callback' => 'omni_auth#facebook'

  # set all other paths to retrieve root, so React can
  # handle the rest of the path
  # only ignore '/auth/facebook', so OmniAuth can grab it
  get '*path' => 'static_pages#root', constraints: { url: /^((?!\/auth\/).)*$/ }

end
