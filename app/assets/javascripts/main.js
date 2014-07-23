$(document).ready(function() {

  var getTodos = function() {
    $.ajax({
      url: "http://localhost:3000/todos",
      type: "GET",
      dataType: 'json',
      success: todosCallbackHandler,
    });
    event.preventDefault();
  },

  // callback handler is invoked when ajax is done
  todosCallbackHandler = function(todos) {
    var todosHTML = '';
    //build html
    for(var i=0; i<todos.length; i++){
      todosHTML+= '<li class="uncomplete">';
      todosHTML+= todos[i].content + ' -- ';
      todosHTML+= todos[i].created_at;
      todosHTML+= '</li>';
    }

    $('#todos').empty();
    $('#todos').append(todosHTML);
  };

  todoHTML = function(todo){
    var html = '<li class="uncomplete">';
    html+= todo.content + ' -- ';
    html+= todo.created_at;
    html+= '</li>';
    return html;
  },
  getTodo = function(todo){
    // Add the article to the article list
    $('#todos').append(todoHTML(todo));
  },
  createTodoCallbackHandler = function(event){
    var $form = $(event.target);
    var $content = $form.find("input[name='content']");
    var action = $form.attr('action');
    var requestObj = {todo: {content: $content.val()}};

    event.preventDefault();

    //create and send POST
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/todos',
      data: requestObj,
      dataType: 'json'
    }).done(getTodo);

    $content.val('');
  };

// Set up click handler for form submit
  $('#new-todo').on('submit', createTodoCallbackHandler);
  // Set up click handler for getting articles.
  $('#get-todos').on('click', getTodos);
  // Simulate a user click event.
  $('#get-todos').trigger('click');
});
