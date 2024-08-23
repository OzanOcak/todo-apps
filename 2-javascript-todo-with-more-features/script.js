// script.js
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodoCompletion(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    li.appendChild(checkbox);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
  updateTodoCount();
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    todos.push({ text: todoText, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function toggleTodoCompletion(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function updateTodoCount() {
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = todos.length - completedTodos;
  todoCount.textContent = `Active: ${activeTodos}, Completed: ${completedTodos}`;
}

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

renderTodos();
