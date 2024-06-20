class ProductsController < ApplicationController
  before_action :authenticate_user!

  def index; end

  def new
    @product = current_user.products.build
  end

  def show; end

  def create
    @product = Product.new(product_params.merge(user: current_user))

    if @product.save
      redirect_to product_path(@product)
    else
      # Error
    end
  end

  private

  def product_params
    params[:product].delete(:price) if params[:product][:price].to_f.zero?
    params.require(:product).permit(:name, :price)
  end
end
