class ChangeColumnTypeOfTasksPriorityToBoolean < ActiveRecord::Migration
  def self.up
    change_table :tasks do |t|
      t.change :priority, :boolean
    end
  end

  def self.down
  end
end
