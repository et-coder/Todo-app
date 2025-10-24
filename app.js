const form = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = getTodos();
updateTodos();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObj = {
      text: todoText,
      isCompleted: false,
    };
    todos.push(todoObj);
    updateTodos();
    saveTodos();
    todoInput.value = "";
  }
}

function createTodo(todo, todoId) {
  const todoLi = document.createElement("li");
  todoLi.className = "todo";
  todoLi.innerHTML = `
    <input type="checkbox" id="todo-${todoId + 1}" />
                        <label class="custom-checkbox" for="todo-${todoId + 1}">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="transparent"
                            >
                                <path
                                    d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                                />
                            </svg>
                        </label>
                        <label for="todo-${todoId + 1}" class="todo-text"
                            >${todo.text}</label
                        >
                        <button class="delete-button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#4a4d57"
                            >
                                <path
                                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                                />
                            </svg>
                        </button>
    `;

  const deleteBtn = todoLi.querySelector(".delete-button");
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todoId);
  });

  const checkBox = todoLi.querySelector("input");
  checkBox.addEventListener("change", () => {
    todos[todoId].isCompleted = checkBox.checked;
    saveTodos();
  });
  checkBox.checked = todo.isCompleted;
  return todoLi;
}

function updateTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, todoId) => {
    const todoItem = createTodo(todo, todoId);
    todoList.append(todoItem);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  const todos = localStorage.getItem("todos");
  return JSON.parse(todos) || [];
}

function deleteTodo(todoId) {
  todos = todos.filter((_, i) => i !== todoId);
  saveTodos();
  updateTodos();
}
