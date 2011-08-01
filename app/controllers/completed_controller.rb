class CompletedController < ApplicationController
  helper_method :sort_column, :sort_direction
  
  def index
    if current_user.admin?
      @completed = Task.where(:completed => true)   
    else
      @completed = Task.where(:completed => true).where('assign_to = ?', current_user.first_name)
    end
  end
  
  private 
    def sort_column
      Task.column_names.include?(params[:filter]) ? params[:filter] : "due_date"
    end
  
    def sort_direction
      %w[ asc desc ].include?(params[:direction]) ? params[:direction] : "asc"
    end
end