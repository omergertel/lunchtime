FactoryGirl.define do
  sequence :name do |_|
    'Name #{_}'
  end

  factory :restaurant do
    name
    genre :sushi
    rating 1
    accepts_10bis true
    delivery_time 30
  end

  factory :review do
    name 'Name'
    comment 'Comment'
    rating 3
    restaurant
  end
end
