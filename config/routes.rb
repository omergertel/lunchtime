Rails.application.routes.draw do
  root to: 'application#root'
  get 'restaurants/options', to: 'restaurants#options', defaults: { format: 'json' }
  resources :restaurants, only: [:index, :show, :create, :update, :destroy] do
    resources :reviews
  end
end
