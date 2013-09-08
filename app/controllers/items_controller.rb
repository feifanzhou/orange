class ItemsController < ApplicationController
  include LoginHelper

  before_filter :authenticate_access

  def create
    @item = Item.new(params[:item])
    @item.item_id = params[:parent_ID] if (!params[:parent_ID].blank?)
    @user = User.find(params[:creator_ID])
    @item.user = @user
    success = @item.save
    if !params[:recipients].blank?
      rec = params[:recipients].split(',')
      rec.each do |r|
        user = nil
        if /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.match(r.strip.downcase)
          user = User.find_by_email(r.strip.downcase)
        elsif /\d+/.match(r.strip)
          user = User.find(r.strip)
        end
        if !user.blank?
          ItemFollower.create(item_id: @item.id, user_id: user.id, is_read: false)
        end
      end
    end
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
    if !params[:item][:start].blank?
      comps = params[:item][:start].split('-')
      puts comps.to_s
      @item.start_at = DateTime.new(comps[0].to_i, comps[1].to_i, comps[2].to_i, comps[3].to_i, comps[4].to_i, 0)
    end
    if !params[:item][:end].blank?
      comps = params[:item][:end].split('-')
      puts comps.to_s
      @item.end_at = DateTime.new(comps[0].to_i, comps[1].to_i, comps[2].to_i, comps[3].to_i, comps[4].to_i, 0)
    end
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
