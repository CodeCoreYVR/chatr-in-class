class AddFlaggedToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :flagged, :bool, default: false
  end
end
