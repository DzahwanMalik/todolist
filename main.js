if (window.location.pathname == "/app.html") {
  const todoInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addTaskButton");
  const deleteAllButton = document.getElementById("deleteAllButton");
  const highList = document.getElementById("highList");
  const mediumList = document.getElementById("mediumList");
  const lowList = document.getElementById("lowList");
  const prioritySelect = document.getElementById("prioritySelect");
  const completedList = document.getElementById("completedList");
  const overdueList = document.getElementById("overdueList");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const user = JSON.parse(localStorage.getItem("user"));

  const employeeName = document.getElementById("employeeName");
  employeeName.textContent = user.username;

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    highList.innerHTML = "";
    mediumList.innerHTML = "";
    lowList.innerHTML = "";
    completedList.innerHTML = "";
    overdueList.innerHTML = "";

    const now = Date.now();

    todos.forEach((todo) => {
      const isOverdue = !todo.completed && (now - todo.createdAt > 24 * 60 * 60 * 1000);

      const todoItem = document.createElement("li");
      todoItem.className = "p-5 shadow rounded";
      todoItem.innerHTML = `
            <div id="time" class="text-xs text-gray-400 mb-5">${todo.time}</div>
            <div class="flex justify-between items-center">
                <div class="">
                    <label>
                    <input type="checkbox" name="" id="" onchange="toggleTodo(${todos.indexOf(
                      todo
                    )})" ${todo.completed ? "checked" : ""} />
                    <span class="${todo.completed ? "line-through" : ""}">${
        todo.text
      }</span>
                    </label>
                </div>
                <button class="bg-red-500 text-white rounded p-1" onclick="deleteTodo(${todos.indexOf(
                  todo
                )})">Delete</button>
            </div>
        `;

      if (todo.completed) {
        completedList.appendChild(todoItem);
      } else if(isOverdue) {
        overdueList.appendChild(todoItem);
      } else if(todo.priority === "high") {
        highList.appendChild(todoItem);
      } else if(todo.priority === "medium") {
        mediumList.appendChild(todoItem);
      } else if(todo.priority === "low") {
        lowList.appendChild(todoItem);
      }
    });
  }

  // Initial render
  renderTodos();
  
  // Check if there are any overdue tasks every hour
  setInterval(renderTodos, 60 * 60 * 1000);

  function addTodo() {
    const todo = todoInput.value;
    if (todo) {
      todos.push({
        text: todo,
        completed: false,
        priority: prioritySelect.value,
        time: new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
        createdAt: Date.now(),
      });
      saveTodos();
      renderTodos();
      todoInput.value = "";
    }
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }

  function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
  }

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    addTodo();
  });

  deleteAllButton.addEventListener("click", (event) => {
    event.preventDefault();
    todos = [];
    saveTodos();
    renderTodos();
  });
}

if(window.location.pathname == "/") {
    const addTaskButton = document.getElementById("addTaskButton");
    addTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        const alertLogin = document.getElementById("alert-login");

        alertLogin.classList.toggle("hidden");
    });
}
