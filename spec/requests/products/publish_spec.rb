require 'rails_helper'

RSpec.describe 'Products::Publish', type: :request do
  let(:user) { create(:user) }

  before { sign_in user }

  describe 'PUT update' do
    it 'successfully publishes the product' do
      product = create(:product, published: false)
      expect do
        put product_publish_path(product)
      end.to change { product.reload.published? }.from(false).to(true)
      expect(response).to redirect_to edit_product_path(product)
    end
  end
end
