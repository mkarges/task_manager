# == Schema Information
# Schema version: 20110801184821
#
# Table name: patrons
#
#  id         :integer         not null, primary key
#  first_name :string(255)
#  last_name  :string(255)
#  email      :string(255)
#  street     :string(255)
#  city       :string(255)
#  state      :string(255)
#  zip        :string(255)
#  phone      :string(255)
#  created_at :datetime
#  updated_at :datetime
#  group      :boolean
#

class Patron < ActiveRecord::Base
  
  has_many :tasks
  

end
