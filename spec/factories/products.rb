FactoryBot.define do
  factory :product do
    user
    name { Faker::Lorem.word }
  end
end
