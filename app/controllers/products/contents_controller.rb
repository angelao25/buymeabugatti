module Products
  class ContentsController < ApplicationController
    before_action :authenticate_user!

    def index
      @product = Product.friendly.find(params[:product_id])
    end
  end
end
