Rails.application.routes.draw do

  root to: 'home#index'

  resources :messages do
    put :toggle_flag, on: :member
  end

end
