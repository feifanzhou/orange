class ItemsController < ApplicationController
  def create
    @item = Item.new(params[:item])
    @item.item_id = params[:parent_ID]
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
    @item.status = params[:status]
    @item.save

    respond_to do |format|
      format.js { render json: { success: 1 } }
    end
  end
end
