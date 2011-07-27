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
