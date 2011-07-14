module ApplicationHelper

   def find_patron
     if a = Patron.find_by_id(@task.patron_id)
       a.last_name
     else
       "None"
     end
   end
   
   def sortable(column, title=nil)
     title ||= column.titleize
     direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
     link_to title, { :filter => column, :direction => direction }           
   end
   
   def englishify(date)
     if date == Date.today
       "Today"
     elsif date == Date.yesterday
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


end
