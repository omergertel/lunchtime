Rails.application.routes.draw do
  root to: 'application#root'
  get 'restaurants/options', to: 'restaurants#options', defaults: { format: 'json' }
  resources :restaurants, defaults: { format: 'json' } do
    get :index
    post :create
  end
end
