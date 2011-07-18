class AddPriorityColumn < ActiveRecord::Migration
  def self.up
    add_column :tasks, :priority, :integer
  end

  def self.down
    remove_columb :tasks, :priority
  end
end
