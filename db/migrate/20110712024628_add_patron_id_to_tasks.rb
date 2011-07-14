class AddPatronIdToTasks < ActiveRecord::Migration
  def self.up
    add_column :tasks, :patron_id, :integer
  end

  def self.down
    remove_column :tasks, :patron_id
  end
end
