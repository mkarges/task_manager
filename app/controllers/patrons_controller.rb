class PatronsController < ApplicationController
  helper_method :sort_column, :sort_direction
  
  # GET /patrons
  # GET /patrons.xml
  def index
    @patron = Patron.find(:all, :order => "last_name")
  end

  # GET /patrons/1
  # GET /patrons/1.xml
  def show
    @patron = Patron.find(params[:id])
    if !current_user.admin?
      @tasks = Task.where("completed = ?", false).where("assign_to = ?", current_user.email).where("patron_id = ?", @patron.id).order(sort_column + " " + sort_direction)
    else
      @tasks = Task.where("completed = ?", false).where("patron_id = ?", @patron.id).order(sort_column + " " + sort_direction)
    end
    
    render :layout => 'patron_layout'

  end

  # GET /patrons/new
  # GET /patrons/new.xml
  def new
    @patron = Patron.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @patron }
    end
  end

  # GET /patrons/1/edit
  def edit
    @patron = Patron.find(params[:id])
  end

  # POST /patrons
  # POST /patrons.xml
  def create
    @patron = Patron.new(params[:patron])
    if @patron.save

        redirect_to new_patron_path

    else
      render 'tasks_path'
    end
  end

  # PUT /patrons/1
  # PUT /patrons/1.xml
  def update
    @patron = Patron.find(params[:id])

    respond_to do |format|
      if @patron.update_attributes(params[:patron])
        format.html { redirect_to(@patron, :notice => 'Patron was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @patron.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /patrons/1
  # DELETE /patrons/1.xml
  def destroy
    @patron = Patron.find(params[:id])
    @patron.destroy

    respond_to do |format|
      format.html { redirect_to(patrons_url) }
      format.xml  { head :ok }
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






