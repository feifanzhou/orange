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
#  item_id    :integer
#

class Item < ActiveRecord::Base
  attr_accessible :name, :status, :start_at, :end_at, :user_id, :type

  belongs_to :user
  has_many :item_categories
  has_many :categories, through: :item_categories
  has_one :item_assignee
  has_one :user, through: :item_assignee
  has_many :item_followers
  has_many :users, through: :item_followers

  belongs_to :item
  has_many :subitems, foreign_key: 'item_id', class_name: 'Item'

  def as_json(options = {})
  	return { type: type }.merge super
  end

  def creator
  	return User.find(self.user_id)
  end

  def all_followers
    users = (self.item_followers.blank?) ? [] : self.item_followers.map(&:user)
    users << self.item_assignee.user if !self.item_assignee.blank?
    users << self.creator if !self.creator.blank?
    return users
  end
end
