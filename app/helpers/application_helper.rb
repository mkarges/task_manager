module ApplicationHelper

   def find_patron(patron_id)
     if @patron = Patron.find_by_id(patron_id)
       @patron.last_name
     else
       "None"
     end
   end
   
   def get_patron
     if a = Patron.find_by_id(@task.patron_id)
       a.last_name
     else
       "None"
     end
   end

   def tasks_history
     img = image_tag("check.jpg")
     link_to img, { :history => true }
   end

   
   def sortable(column, title=nil)
     title ||= column.titleize
     direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
     link_to title, { :filter => column, :direction => direction }           
   end
   
   def englishify(date)
     if date == Date.today
       "Today"
     elsif date == Date.today - 1
       "Yesterday"
     elsif date == Date.today - 2
       "2 Days Ago"
     elsif date == Date.today - 3
       "3 Days Ago"
     elsif date == Date.today - 4
       "4 Days Ago"
     elsif date == Date.today - 5
       "5 days Ago"
     elsif date == Date.today - 6
       "6 days Ago"
     elsif date == Date.today - 7
       "One Week Ago"
     elsif date < Date.today - 7
       "Over a Week Ago"
     else
       date.strftime("%m/%d/%y")
     end
   end
   
   def color_code(priority)
     if priority == 2
       image_tag('green.jpg')
     elsif priority == 1    
       image_tag('yellow.jpg') 
     else                   
       image_tag('red.jpg') 
    end                              
                                     
   end
   
   def priority_level(priority)
     if priority == 0
       "High"
     elsif priority == 1
       "Medium"
     else
       "Low"
     end
   end
   
   def personalize(email)
     if email == current_user.email
       "Me"
     else
       val = email.match(/.+/)
       val
     end
   end


end
