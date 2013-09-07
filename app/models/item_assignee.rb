# == Schema Information
#
# Table name: item_assignees
#
#  id         :integer          not null, primary key
#  item_id    :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ItemAssignee < ActiveRecord::Base
  attr_accessible :item_id, :user_id

  belongs_to :item
  belongs_to :user
end
