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
    var todoCount = 0;
    var doneCount = 0;
    //build html
    for(var i=0; i<todos.length; i++){
      if (todos[i].completed) {
        doneCount ++;
      }
      else {
        todoCount ++;
      }
    }
    $('#doneCount').attr('val', doneCount);
    $('#todoCount').attr('val', todoCount);
    $('#doneCount').append(doneCount);
    $('#todoCount').append(todoCount);
    $('#todos').empty();
    $('#dones').empty();
    $('#todos').append(HandlebarsTemplates.todo(todos));
    $('#dones').append(HandlebarsTemplates.done(todos));
  },
  getTodo = function(todo){
    // Add the article to the article list and increment counter
    $('#todos').append(HandlebarsTemplates.todo([todo]));
    var count = $('#todoCount').attr('val');
    count ++;
    $('#todoCount').attr('val', count);
    $('#todoCount').empty();
    $('#todoCount').append(count);
  },
  createTodo = function(event){
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
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      if (errorThrown === "Unprocessable Entity ") {
        alert('Todo is blank or already in list');
      }
    })
    .done(getTodo);

    $content.val('');
  },
  // add done to dones list and increment counter
  completeCallbackHandler = function(todo) {
    $('#dones').append(HandlebarsTemplates.done([todo]));
    var count = $('#doneCount').attr('val');
    count ++;
    $('#doneCount').attr('val', count);
    $('#doneCount').empty();
    $('#doneCount').append(count);
  },
  completeTodo = function(event) {
    event.preventDefault();
    var todoID = $(this).parent().attr('id');
    // remove li from todos
    $(this).parent().remove();
    //create and submit update
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/todos/' + todoID,
      dataType: 'json'
    })
    .done(function(data) {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/todos/' + todoID,
        dataType: 'json',
      }).done(completeCallbackHandler);
    })
    .fail(console.log('failed'));

    var count = $('#todoCount').attr('val');
    count --;
    $('#todoCount').attr('val', count);
    $('#todoCount').empty();
    $('#todoCount').append(count);
  },
    //   STILL FAILING, DESPITE APPARENTLY WORKING
    //////////////////////////////////////////////
  deleteTodo = function(event){
    event.preventDefault();
    var todoID = $(this).parent().attr('id');
    var count;
    //decrement appropriate counter
    if ($(this).parent().attr('class') === 'completed') {
      count = $('#doneCount').attr('val');
      count --;
      $('#doneCount').attr('val', count);
      $('#doneCount').empty();
      $('#doneCount').append(count);
    }
    else {
      count = $('#todoCount').attr('val');
      count --;
      $('#todoCount').attr('val', count);
      $('#todoCount').empty();
      $('#todoCount').append(count);
    }
    $(this).parent().remove();
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/todos/' + todoID,
      dataType: 'json'
    });
  };

  //set up click handler for deleting a todo
  $('ol').on('click', '.delete', deleteTodo);
  //set up click handler for completing a todo
  $('#todos').on('click', '.complete', completeTodo);
  // Set up click handler for form submit
  $('#new-todo').on('submit', createTodo);
  // Set up click handler for getting articles.
  $('#get-todos').on('click', getTodos);
  // Simulate a user click event.
  $('#get-todos').trigger('click');
});
