Rails.application.routes.draw do

	root to: "static_pages#root"

	namespace :api do
		resources :projects, only: [:index, :show, :create, :update]
	end

end
