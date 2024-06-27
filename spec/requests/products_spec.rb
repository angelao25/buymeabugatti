require 'rails_helper'

RSpec.describe 'Products', type: :request do
  let(:user) { create(:user) }
  before { sign_in user }
  describe 'GET /index' do
    it 'succeeds' do
      get products_path
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET new' do
    it 'succeeds' do
      get new_product_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET edit" do
    it "succeeds" do
      product = create(:product)
      get edit_product_path(product)
      expect(response).to have_http_status(:success)
    end
  end
  describe 'POST create' do
    context 'valid params with price as string' do
      it 'succeeds' do
        expect do
          post products_path, params: {
            product: {
              name: 'new product name',
              price: 'hello world'
            }
          }
        end.to change(Product, :count).by(1)
        expect(response).to have_http_status(:redirect)
      end
    end
    context 'valid params with price as number' do
      it 'succeeds' do
        expect do
          post products_path, params: {
            product: {
              name: 'new product name',
              price: '12.24'
            }
          }
        end.to change(Product, :count).by(1)
        expect(response).to have_http_status(:redirect)
        expect(Product.last.price.to_s).to eq('12.24')
      end
    end
  end

  describe 'PUT update' do
    it "succeeds" do
      product = create(:product)
      expect do
        put product_path(product), params: {
          product: {
            name: "foo"
          }
        }
      end.to change { product.reload.name }.to("foo")

      expect(response).to redirect_to(edit_product_path)
    end
  end
end
