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

  # TODO: Why does User.items itself not work…?
  def all_items
    item_ids = []
    items = self.created_items
    items << self.assigned_items
    items << followed_items
    items.flatten!
    no_dups = []
    items.each do |i|
      if !item_ids.include? i.id
        no_dups << i
        item_ids << i.id
      end
    end
    return no_dups
  end

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
