class AddStartAndEndToItems < ActiveRecord::Migration
  def change
    add_column :items, :start_at, :datetime
    add_column :items, :end_at, :datetime
  end
end
