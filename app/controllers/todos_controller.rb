class TodosController < ApplicationController

  # def default_serializer_options
  #   {root: false}
  # end

  # only respond to requests for JSON
  respond_to :json

  def index
    @todos = Todo.all
    respond_with(@todos)
  end

  def show
    @todo = Todo.find(params[:id])
    respond_with(@todo)
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      respond_with(@todo)
    else
      respond_with(@todo.errors)
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:content)
  end
end

