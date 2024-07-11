require 'rails_helper'

RSpec.describe 'Products::AttachContents', type: :request do
  let(:user) { create(:user) }

  before { sign_in user }

  describe 'PUT update' do
    it 'attaches the contents to the product' do
      product = create(:product, user:)
      contents = create_list(:content, 3, product: nil)
      content_params = contents.map do |content|
        {
          id: content.id,
          name: 'new name',
          description: 'new description'
        }
      end
      post product_attach_contents_path(product), params: {
        contents: content_params
      }
      expect(response).to have_http_status(:redirect)
      contents.each(&:reload).each do |content|
        expect(content.product_id).to eq product.id
        expect(content.name).to eq 'new name'
        expect(content.description).to eq 'new description'
      end
    end
  end
end
