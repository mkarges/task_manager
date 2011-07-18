class RemovePriorityColumn < ActiveRecord::Migration
  def self.up
    remove_column :tasks, :priority
  end

  def self.down
    add_column :tasks, :priority
  end
end
