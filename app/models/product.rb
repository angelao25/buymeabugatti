class Product < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  monetize :price_cents, allow_nil: true
  belongs_to :user
end
