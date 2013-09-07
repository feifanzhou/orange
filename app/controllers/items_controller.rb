class ItemsController < ApplicationController
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
