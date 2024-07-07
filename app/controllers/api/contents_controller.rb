module Api
  class ContentsController < ApplicationController
    protect_from_forgery with: :null_session
    # before_action :authenticate_user!

    def create
      @content = Content.create(content_params)
      # render json: ContentSerializer.new(@content).serializable_hash.to_json

      respond_to do |format|
        format.turbo_stream
      end
    end

    private

    def content_params
      params.require(:content).permit(:name)
    end
  end
end
