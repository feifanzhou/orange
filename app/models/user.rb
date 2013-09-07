# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  fname           :string(255)
#  lname           :string(255)
#  email           :string(255)
#  password_digest :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_accessible :email, :fname, :lname, :password_digest

  has_many :items
  has_many :item_assignees
  has_many :items, through: :item_assignees
  has_many :item_followers
  has_many :items, through: :item_followers

  def created_items
  	return Item.where(:user_id => self.id).all  # all may not be needed: http://stackoverflow.com/a/14867137/472768
  end

  def assigned_items
    @items = []
    self.item_assignees.each do |a|
      @items << a.item
    end
    return @items
  end

  def followed_items
    @items = []
    self.item_followers.each do |f|
      @items << f.item
    end
    return @items
  end
end
