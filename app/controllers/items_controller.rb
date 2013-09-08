class ItemsController < ApplicationController
  include LoginHelper

  before_filter :authenticate_access

  def create
    @item = Item.new(params[:item])
    @item.item_id = params[:parent_ID]
    @user = User.find(params[:creator_ID])
    @item.user = @user
    success = @item.save
    respond_to do |format|
      format.js { render json: { status_code: 200, success: success, id: @item.id } }
    end
  end
  def show
    @item = Item.find(params[:id])
  end

  def update
    @item = Item.find(params[:id])
    @item.status = params[:status] if !params[:status].blank?
    @item.type = params[:item][:type] if !params[:item][:type].blank?
    @item.save

    respond_to do |format|
      format.js { render json: { success: 1 } }
    end
  end

  private
  def authenticate_access
    if !is_logged_in
      redirect_to login_path
    end
  end
end
