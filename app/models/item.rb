class Item < ActiveRecord::Base
  attr_accessible :name, :status, :start_at, :end_at
end
