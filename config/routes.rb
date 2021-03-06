Orange::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.
  
  root to: 'main#main'

  resources :categories
  resources :events
  resources :items
  resources :notes
  resources :tasks
  resources :users

  get '/login' => 'login#index', as: :login
  match '/go_login' => 'login#create', as: :go_login
  match '/logout' => 'login#destroy', as: :logout

  # TODO: Make route resources plural
  get '/category/:id/items' => 'categories#items', as: :items_for_category
  get '/category/:id/all_items' => 'categories#items', as: :all_items_for_category

  get '/user/:id/items' => 'users#items', as: :items_for_user
  get '/user/:id/all_items' => 'users#all_items', as: :all_items_for_user
  get '/user/:id/created_items' => 'users#created_items', as: :user_created_items
  get '/user/:id/assigned_items' => 'users#assigned_items', as: :user_assigned_items
  get '/user/:id/followed_items' => 'users#followed_items', as: :user_followed_items
  get '/users/:id/inbox_items' => 'users#inbox_items', as: :user_inbox_items

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
