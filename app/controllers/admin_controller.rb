class AdminController < ApplicationController
  helper_method :sort_column, :sort_direction

  def index
    if !Task.column_names.include?(params[:filter])    
      @today = Task.where("completed = ?", false).where("due_date <= ?", Date.today).order("due_date asc")
      @next = Task.where("completed = ?", false).where("due_date > ?", Date.today).order("due_date asc")
    else
      @tasks = Task.where("completed = ?", false).order(sort_column + " " + sort_direction)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @tasks }
    end
  end

  def show
    @task = Task.find(params[:id])
    @record_number = @task.id
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @task }
    end
  end

  def new
    @task = Task.new(:priority => 'Medium', :assign_to => current_user)
    @header = "New Task"
  end

  def edit
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new(params[:task])
    if @task.save
      redirect_to tasks_path
    else
      render 'new', :remote => true
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.update_attributes(params[:task])
      redirect_to tasks_path
    else
      render edit_task_path, :remote => true
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    respond_to do |format|
      format.html { redirect_to(tasks_url) }
      format.xml  { head :ok }
    end
  end
  
  private

    def fix_assign_to_current_user
      @select_users = User.find(:all).delete_if { |i| i.email == current_user.email }
    end
    
    def sort_column
      Task.column_names.include?(params[:filter]) ? params[:filter] : "due_date"
    end
    
    def sort_direction
      %w[ asc desc ].include?(params[:direction]) ? params[:direction] : "asc"
    end
  
end
