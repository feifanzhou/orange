class AddMessageUserRelationsToItemFollowers < ActiveRecord::Migration
  def change
    add_column :item_followers, :is_read, :boolean
    add_column :item_followers, :is_flagged, :boolean
    add_column :item_followers, :deferred_to, :datetime
    add_column :item_followers, :read_time, :datetime
  end
end
