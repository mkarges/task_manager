class RemovePriorityColumnAgain < ActiveRecord::Migration
  def self.up
    remove_column :tasks, :priority
  end

  def self.down
  end
end
