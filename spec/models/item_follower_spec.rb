# == Schema Information
#
# Table name: item_followers
#
#  id         :integer          not null, primary key
#  item_id    :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'

describe ItemFollower do
  pending "add some examples to (or delete) #{__FILE__}"
end
