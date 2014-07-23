class TodosController < ApplicationController

  def default_serializer_options
    {root: false}
  end

  # only respond to requests for JSON

  respond_to :json

  def index
    #respond_with (@todos = Todo.all)
    @todos = Todo.all
    respond_with @todos
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

  def update
    @todo = Todo.find(params[:id])
    @todo.completed_at = Time.now
    @todo.completed = true
    @todo.save
    respond_with @todo
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy

    head :no_content
  end


  private

  def todo_params
    params.require(:todo).permit(:content, :completed_at)
  end
end

