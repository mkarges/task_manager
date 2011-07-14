class Task < ActiveRecord::Base
  
  belongs_to :patron
  
  paginates_per 5
  
  validates_presence_of :subject
  
  def admin?
    self.admin == true
  end
  
end
