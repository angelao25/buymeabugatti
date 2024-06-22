require 'rails_helper'

RSpec.describe 'Products::Unpublish', type: :request do
  let(:user) { create(:user) }

  before { sign_in user }

  describe 'PUT update' do
    it 'successfully unpublishes the product' do
      product = create(:product, published: true)
      expect do
        put product_unpublish_path(product)
      end.to change { product.reload.published? }.from(true).to(false)
      expect(response).to redirect_to edit_product_path(product)
    end
  end
end

