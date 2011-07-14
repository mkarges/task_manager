class Patron < ActiveRecord::Base
  
  has_many :tasks
  

end
