class TodosController < ApplicationController

  # def default_serializer_options
  #   {root: false}
  # end

  # only respond to requests for JSON
  respond_to :json

  def index
    #respond_with (@todos = Todo.all)
    @todos = Todo.all
    respond_to do |format|
      format.json { render :json => @todos }
    end
  end

  def show
    respond_with (@todo = Todo.find(params[:id]))
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      respond_with @todo
    else
      respond_with @todo.errors
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:content)
  end
end

