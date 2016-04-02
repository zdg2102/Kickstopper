Rails.application.routes.draw do

	root to: "static_pages#root"

	namespace :api, defaults: {format: :json} do
		resources :projects, only: [:index, :show, :create, :update]
    get '/searches/search' => 'searches#search'
    resource :session, only: [:create, :destroy]
    get '/session/current' => 'sessions#current'
	end

end
