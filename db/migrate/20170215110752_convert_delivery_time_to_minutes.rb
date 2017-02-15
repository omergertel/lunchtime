class ConvertDeliveryTimeToMinutes < ActiveRecord::Migration[5.0]
  def up
    update 'UPDATE restaurants
            SET delivery_time=CASE
              WHEN delivery_time=0 THEN 90
              WHEN delivery_time=1 THEN 60
              WHEN delivery_time=2 THEN 30
              END'
  end

  def down
    update 'UPDATE restaurants
            SET delivery_time=CASE
              WHEN delivery_time>=90 THEN 0
              WHEN delivery_time>=60 THEN 1
              ELSE 2
              END'
  end
end
