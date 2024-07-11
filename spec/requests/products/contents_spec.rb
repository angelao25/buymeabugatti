require 'rails_helper'

RSpec.describe 'Products::Contents', type: :request do
  let(:user) { create(:user) }
  let(:product) { create(:product, user:) }

  before { sign_in user }

  describe 'GET index' do
    it 'succeeds' do
      get product_contents_path(product)
      expect(response).to have_http_status(:success)
    end
  end
end
