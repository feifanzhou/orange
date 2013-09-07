class CategoriesController < ApplicationController
	def index
    @categories = Category.all
    respond_to do |format|
      format.js   { render json: { categories: @categories } }
    end
  end

  def items
    @category = Category.find(params[:id])
    @items = @category.items
    respond_to do |format|
      format.js { render json: { category: @category, items: @items } }
    end
  end
end
