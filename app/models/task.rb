# == Schema Information
# Schema version: 20110731033902
#
# Table name: tasks
#
#  id          :integer         not null, primary key
#  due_date    :date
#  priority    :integer
#  subject     :string(255)
#  description :string(255)
#  completed   :boolean
#  assign_to   :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#  type        :
#  patron_id   :integer
#  comm_type   :string(255)
#

class Task < ActiveRecord::Base
  
  belongs_to :patron
  
  paginates_per 5
  
  # validates_presence_of :subject
  
  def admin?
    self.admin == true
  end
  
  def set_date
    due_date.to_s
  end
 
  def set_date=(string)
    self.due_date = Chronic.parse(string)
  end
  

  
end
