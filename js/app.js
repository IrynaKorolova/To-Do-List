const todos = [];
const addFormEl = document.getElementById("addForm");
const todoListEl = document.getElementById("todos");
const totalEl = document.getElementById("total");

//rendering todo list
function renderTodos(todos, todoList) {
  totalEl.textContent = todos.length;
  todoList.innerHTML = todos.map((todo) => createTodoHTML(todo)).join("");
}

renderTodos(todos, todoListEl);

addFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = e.target.querySelector("button");
  submitBtn.disabled = true;
  //creating a new todo object and pushing it into
  // the `todos` array
  const newTodo = {
    body: e.target.item.value,
    completed: false,
    id: Date.now(),
  };
  todos.push(newTodo);
  submitBtn.disabled = false;
  e.target.reset();
  renderTodos(todos, todoListEl);
});

// Mark task as completed
const list = document.querySelector(".list-group");
list.addEventListener("click", (event) => {
  const itemKey = event.target.closest("li").dataset.id;
  console.log(itemKey);
  if (event.target.getAttribute("type") === "checkbox") {
    toggleDone(itemKey);
  } else if (event.target.classList.contains("btn-close")) {
    deleteTodo(itemKey);
  }
});

function toggleDone(name) {
  // Locate the todo item in the todos array and set its checked property to the opposite
  const index = todos.findIndex((item) => item.id === Number(name));
  todos[index].completed = !todos[index].completed;
  renderTodos(todos, todoListEl);
}
// remove the todo item from the array
function deleteTodo(name) {
  const index = todos.findIndex((item) => item.id === Number(name));
  todos.splice(index, 1);
  renderTodos(todos, todoListEl);
}

//creating html
function createTodoHTML(todo) {
  return `<li class="list-group-item todo" data-id = '${todo.id}'>
  <div class="row">
    <div class="col-1 todo-check">
      <input type="checkbox"  ${todo.completed ? "checked" : ""}>
    </div>
    <div class="col-10">
      <p class="m-0 ${todo.completed ? "completed" : ""}">${todo.body}</p>
    </div>
    <div class="col-1">
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
  </div>
</li>`;
}
