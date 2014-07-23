$(document).ready(function() {

  var getTodos = function() {
    console.log('in getTodos');
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
      todosHTML+= '<li class="uncomplete">' + todos[i].content + '</li>';
    }

    $('#todos').empty();
    $('#todos').append(todosHTML);
  };

  // Set up click handler for getting articles.
  $('#get-todos').on('click', getTodos);
  // Simulate a user click event.
  $('#get-todos').trigger('click');
});
