const todos = [];
const addFormEl = document.getElementById("addForm");
const todoListEl = document.getElementById("todos");
const totalEl = document.getElementById("total");

//rendering todo list
function renderTodos(todos, todoList) {
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
  console.log(todos);
  renderTodos(todos, todoListEl);
});

const list = document.querySelector(".list-group");
// Add a click event listener to the list and its children
list.addEventListener("click", (event) => {
  if (event.target.getAttribute("type") === "checkbox") {
    const itemKey = event.target.name;
    toggleDone(itemKey);
  }
});

function toggleDone(name) {
  // findIndex is an array method that returns the position of an element
  // in the array.
  const index = todos.findIndex((item) => item.id === Number(name));
  console.log(index);
  // Locate the todo item in the todos array and set its checked
  // property to the opposite
  todos[index].completed = !todos[index].completed;
  renderTodos(todos, todoListEl);
}

//creating html
function createTodoHTML(todo) {
  return `<li class="list-group-item todo">
  <div class="row">
    <div class="col-1 todo-check">
      <input type="checkbox" name="${todo.id}" ${
    todo.completed ? "checked" : ""
  }>
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
