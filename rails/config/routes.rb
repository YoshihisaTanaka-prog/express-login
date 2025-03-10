Rails.application.routes.draw do
  resources :users
  post "user_matches" => "users#matches"

  get "up" => "rails/health#show", as: :rails_health_check
end
