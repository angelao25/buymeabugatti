module Products
  class AttachContentsController < ApplicationController
    protect_from_forgery with: :null_session
    # before_action :authenticate_user!

    def create
      @product = Product.friendly.find(params[:product_id])
      @contents = []

      content_params[:contents].each do |content_param|
        content = Content.find(content_param[:id])
        content.name = content_param[:name]
        content.description = content_param[:description].blank? ? nil : content_param[:description]
        content.product_id = @product.id
        @contents << content
      end
      @contents.each(&:save)
      respond_to do |format|
        format.turbo_stream do
          flash[:success] = 'Files successfully uploaded'
        end
      end
    end

    def destroy
      @product = Product.friendly.find(params[:product_id])
    end

    private

    def content_params
      params.permit(contents: %i[id name description])
    end
  end
end
