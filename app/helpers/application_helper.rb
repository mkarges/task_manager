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
     if priority == true    
       image_tag('redDot.jpg') 
     end                                                                 
   end
   
   def priority_level(priority)
     if priority == true
       "High"
     else
       "Normal"
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
   
   def next_task(task)
     if current_user.admin?
       nex = Task.where("id > ?", task.id).order("id asc").limit(1)
     else
       nex = Task.where("id > ?", task.id).where("assign_to = ?", current_user.email).order("id asc").limit(1)
     end
     @forward = Task.find_by_id(nex)
     link_to "Next", task_path(@forward), :remote => true       
   end

   def previous_task(task)
     if current_user.admin?
       prev = Task.where("id < ?", task.id).order("id desc").limit(1)
     else
       prev = Task.where("id < ?", task.id).where("assign_to = ?", current_user.email).order("id desc").limit(1)
     end
     @previous = Task.find_by_id(prev)
     link_to "Previous", task_path(@previous), :remote => true       
   end

end
