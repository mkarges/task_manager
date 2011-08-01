class CreateTasks < ActiveRecord::Migration
  def self.up
    create_table :tasks do |t|
      t.date :due_date
      t.string :comm
      t.integer :priority
      t.string :subject
      t.string :description
      t.boolean :completed
      t.string :assign_to

      t.timestamps
    end
  end

  def self.down
    drop_table :tasks
  end
end
