# == Schema Information
#
# Table name: item_followers
#
#  id          :integer          not null, primary key
#  item_id     :integer
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  is_read     :boolean
#  is_flagged  :boolean
#  deferred_to :datetime
#  read_time   :datetime
#

class ItemFollower < ActiveRecord::Base
  attr_accessible :item_id, :user_id, :is_read, :is_flagged, :deferred_to, :read_time

  belongs_to :item
  belongs_to :user
end
