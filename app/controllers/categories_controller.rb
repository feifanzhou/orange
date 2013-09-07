class CategoriesController < ApplicationController
	def index
    @categories = Category.all
    respond_to do |format|
      format.js   { render json: { categories: @categories } }
    end
  end
end
