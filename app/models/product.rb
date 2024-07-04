class Product < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  monetize :price_cents, allow_nil: true
  belongs_to :user
  has_many :contents, dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false, scope: :user_id }


  has_rich_text :description

  def draft?
    !published?
  end
end
