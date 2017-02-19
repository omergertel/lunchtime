Rails.application.routes.draw do
  root to: 'application#root'
  resources :restaurants, only: [:index, :show, :create, :update, :destroy] do
    collection do
      get :options
    end
    resources :reviews
  end
end
