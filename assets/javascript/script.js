// Initial todos. For now, hard code this, should get this state from persistent storage later.
var todos = [
  {
    id: 1,
    text: 'learn javascript',
    complete: true
  },
  {
    id: 2,
    text: 'eat pizza',
    complete: true
  }
];

// Increment global ID so they are unique.
var id = todos.length;
function incrementId() {
  id++;
  return id;
}

function renderTodos() {

  $('.todos').html('');

  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    // var fun = todo.complete ? 'checked' : ''

    var fun;
    if (todo.complete === true) {
      fun = 'checked';
      $('.todos').append("<li class='done-todo' data-id=" + todo.id + "><label><input class='toggle-todo' type='checkbox' " + fun + "/> " + todo.text + "</label></li>");
    } else {
      fun = '';
      $('.todos').append("<li class='todo' data-id=" + todo.id + "><label><input class='toggle-todo' type='checkbox' " + fun + "/> " + todo.text + "</label></li>");
    }


  }
}

function findById(id) {
  var todo;

  for(var i = 0; i < todos.length; i++) {
    if (todos[i].id === Number(id)) {
      todo = todos[i];
    }
  }

  return todo;
}

$(document).ready(function() {
  // Initialize with any existing todos.
  renderTodos();

  // Bind to input update to mark todo as complete.
  $(document).on('change', '.toggle-todo', function(event) {
    var id = $(event.target).parent().parent().data('id');
    var todo = findById(id);

    todo.complete = event.target.checked;

    renderTodos();
  });


  // Bind to new todo form submission to create new todos.
  $(document).on('submit', '.new-todo', function(event) {
    event.preventDefault();
    var text = $('.todo-text').val();
    $('.todo-text').val('');

    if (text.trim().length !== 0){

    var newTodo = {
      id: incrementId(),
      text: text,
      completed: false
    };

    todos.push(newTodo);
  }
  else {
    alert("Don't leave it blank, my man!");
  }
    renderTodos();


  });

});
