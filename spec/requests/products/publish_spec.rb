require 'rails_helper'

RSpec.describe 'Products::Publish', type: :request do
  let(:user) { create(:user) }

  before { sign_in user }

  describe 'PUT update' do
    it 'successfully publishes the product' do
      product = create(:product, published: false)
      expect do
        put product_publish_path(product), headers: { ACCEPT: "text/vnd.turbo-stream.html"}
      end.to change { product.reload.published? }.from(false).to(true)
      expect(response).to have_http_status(:success)
    end
  end
end
