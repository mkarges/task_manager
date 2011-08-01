# == Schema Information
# Schema version: 20110801184821
#
# Table name: tasks
#
#  id          :integer         not null, primary key
#  due_date    :date
#  comm        :string(255)
#  priority    :boolean
#  subject     :string(255)
#  description :string(255)
#  completed   :boolean
#  assign_to   :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#  patron_id   :integer
#

class Admin < Task
  
end
