//Selectors
const todoInput = document.querySelector('.todo-input'),
      todoButton = document.querySelector('.todo-button'),
      todoList = document.querySelector('.todo-list'),
      filterOption = document.querySelector('.filter-todo');


//Event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addToDo(Event){
    //Prevent form from submitting
    event.preventDefault();
    //ToDo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
    //ADD TODO TO LOCALSTOTAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR TODOINPUT VALUE
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;

    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        //removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //CHECK MARK
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //Check- do i have already have smth there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
      //Check- do i have already have smth there?
      let todos;
      if(localStorage.getItem('todos') === null) {
          todos = [];
  
      } else {
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      todos.forEach(function(todo){
           //ToDo DIV
           const todoDiv = document.createElement('div');
           todoDiv.classList.add('todo');
          //Create LI
           const newToDo = document.createElement('li');
           newToDo.innerText = todo;
           newToDo.classList.add('todo-item');
           todoDiv.appendChild(newToDo);
           //CHECK MARK BUTTON
           const completedButton = document.createElement('button');
           completedButton.innerHTML = '<li class="fas fa-check"></li>';
           completedButton.classList.add('complete-btn');
           todoDiv.appendChild(completedButton);
           //CHECK TRASH BUTTON
           const trashButton = document.createElement('button');
           trashButton.innerHTML = '<li class="fas fa-trash"></li>';
           trashButton.classList.add('trash-btn');
           todoDiv.appendChild(trashButton);
           //APPEND TO LIST
           todoList.appendChild(todoDiv);

         });

}

function removeLocalTodos(todo){
    //Check- do i have already have smth there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todo.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}