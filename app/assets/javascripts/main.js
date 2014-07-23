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
    var donesHTML = '';
    //build html
    console.log('in get handler');
    for(var i=0; i<todos.length; i++){
      if (todos[i].completed) {
        donesHTML+= '<li class="complete" id=' + todos[i].id + '>';
        donesHTML+= todos[i].content + ' -- ';
        donesHTML+= todos[i].completed_at;
        donesHTML+= '<button class="delete">Delete</button>';
        donesHTML+= '</li>';
      }
      else {
        todosHTML+= '<li class="uncomplete" id=' + todos[i].id + '>';
        todosHTML+= todos[i].content + ' -- ';
        todosHTML+= todos[i].created_at;
        todosHTML+= '<button class="complete">Complete</button>';
        todosHTML+= '<button class="delete">Delete</button>';
        todosHTML+= '</li>';
        console.log('in uncompleted');
      }
    }

    console.log(todosHTML);
    console.log(donesHTML);
    $('#todos').empty();
    $('#dones').empty();
    $('#dones').append(donesHTML);
    $('#todos').append(todosHTML);
  },
  todoHTML = function(todo){
    var html = '<li class="uncomplete" id=' + todo.id + '>';
    html+= todo.content + ' -- ';
    html+= todo.created_at;
    html+= '<button class="complete">Complete</button>';
    html+= '<button class="delete">Delete</button>';
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
  },


  completeTodoHTML = function(todo){
    var html = '<li class="complete" id=' + todo.id + '>';
    html+= todo.content + ' -- ';
    html+= todo.completed_at;
    html+= '<button class="delete">Delete</button>';
    html+= '</li>';
    return html;
  },
  getDone = function(id){
    console.log('in done');
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/todos/' + id,
      dataType: 'json',
    }).done(doneCallbackHandler);
  },
  doneCallbackHandler = function(todo) {
    console.log('in handler');
    $('#dones').append(completeTodoHTML(todo));
  },
  completeTodoCallbackHandler = function(event) {
    event.preventDefault();
    var todoID = $(this).parent().attr('id');
    // remove li from todos
    $(this).parent().remove();
    //create and submit update
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/todos/' + todoID,
      dataType: 'json'
    }).done(getDone(todoID))
      .fail(console.log('failed'));
  };
//   STILL FAILING, DESPITE APPARENTLY WORKING

  //set up click handler for completing a todo
  $('#todos').on('click', '.complete', completeTodoCallbackHandler);

  // Set up click handler for form submit
  $('#new-todo').on('submit', createTodoCallbackHandler);
  // Set up click handler for getting articles.
  $('#get-todos').on('click', getTodos);
  // Simulate a user click event.
  $('#get-todos').trigger('click');
});
