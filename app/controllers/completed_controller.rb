class CompletedController < ApplicationController
  helper_method :sort_column, :sort_direction
  
  def index
    @completed = Task.where(:completed => true)   
  end
  
  private 
    def sort_column
      Task.column_names.include?(params[:filter]) ? params[:filter] : "due_date"
    end
  
    def sort_direction
      %w[ asc desc ].include?(params[:direction]) ? params[:direction] : "asc"
    end
end