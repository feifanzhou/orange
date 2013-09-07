# == Schema Information
#
# Table name: items
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  status     :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  start_at   :datetime
#  end_at     :datetime
#  type       :string(255)
#  user_id    :integer
#

class Item < ActiveRecord::Base
  attr_accessible :name, :status, :start_at, :end_at, :user_id, :type

  belongs_to :user
  has_many :categories, through: :item_categories
  has_one :item_assignees
  has_one :users, through: :item_assignees
  has_many :item_followers
  has_many :users, through: :item_followers

  def as_json(options = {})
  	return { type: type }.merge super
  end
  
  def creator
  	return User.find(self.user_id)
  end
end
