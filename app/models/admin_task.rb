# == Schema Information
# Schema version: 20110717225943
#
# Table name: tasks
#
#  id          :integer         not null, primary key
#  due_date    :date
#  subject     :string(255)
#  description :string(255)
#  completed   :boolean
#  assign_to   :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#  type        :string(255)
#  patron_id   :integer
#  priority    :integer
#

class AdminTask < Task
  
end
