const todos = [];
const addFormEl = document.getElementById("addForm");
const todoListEl = document.getElementById("todos");

renderTodos(todos, todoListEl);

addFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = e.target.querySelector("button");
  submitBtn.disabled = true;
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

function renderTodos(todos, todoList) {
  todoList.innerHTML = todos.map((todo) => createTodoHTML(todo)).join("");
}

function createTodoHTML(todo) {
  return `<li class="list-group-item todo">
  <div class="row">
    <div class="col-1">
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

// axios.get("/json/data1.json")
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.dir(err.toJSON());
//   })
