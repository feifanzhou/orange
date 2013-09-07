class CreateItemAssignees < ActiveRecord::Migration
  def change
    create_table :item_assignees do |t|
      t.integer :item_id
      t.integer :user_id

      t.timestamps
    end
  end
end
