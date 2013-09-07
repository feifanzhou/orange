# == Schema Information
#
# Table name: item_categories
#
#  id          :integer          not null, primary key
#  item_id     :integer
#  category_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class ItemCategory < ActiveRecord::Base
  attr_accessible :category_id, :item_id

  belongs_to :item
  belongs_to :category
end
