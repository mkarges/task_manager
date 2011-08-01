class CancelledController < ApplicationController
  helper_method :sort_column, :sort_direction
  
  def index
    flash[:notice] = "This will print a list of cancelled tasks" 

  end
  

end