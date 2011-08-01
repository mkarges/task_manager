class AddGroupToPatrons < ActiveRecord::Migration
  def self.up
    add_column :patrons, :group, :boolean
  end

  def self.down
    remove_column :patrons, :group
  end
end
