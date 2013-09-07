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

require 'spec_helper'

describe Note do
  pending "add some examples to (or delete) #{__FILE__}"
end
