class UsersController < ApplicationController
	def index
    @users = User.all
    respond_to do |format|
      format.js { render json: { users: @users } }
    end
  end

  def items
    @user = User.find(params[:id])
    respond_to do |format|
      format.js { render json: { user: @user, items: @user.items } }
    end
  end

  def created_items
    @user = User.find(params[:id])
    respond_to do |format|
      format.js { render json: { user: @user, items: @user.created_items } }
    end
  end

  def assigned_items
    @user = User.find(params[:id])
    respond_to do |format|
      format.js { render json: { user: @user, items: @user.assigned_items } }
    end
  end

  def followed_items
    @user = User.find(params[:id])
    respond_to do |format|
      format.js { render json: { user: @user, items: @user.followed_items } }
    end
  end
end
