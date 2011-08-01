class PagesController < ApplicationController
  helper_method :sort_column, :sort_direction
  before_filter :get_group_id

  def index
    @tasks = Task.where("completed = ?", false).where("assign_to = ?", current_user.first_name).order(sort_column + " " + sort_direction).limit(5)
  end
  

  private
    
    def sort_column
      Task.column_names.include?(params[:filter]) ? params[:filter] : "due_date"
    end
    
    def sort_direction
      %w[ asc desc ].include?(params[:direction]) ? params[:direction] : "asc"
    end
    
    def get_group_id
      @group_id = Patron.find_by_email("group@thegroup.net").id      
    end

end