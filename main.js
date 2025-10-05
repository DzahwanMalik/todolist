if (window.location.pathname == "/app.html") {
  const todoInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addTaskButton");
  const deleteAllButton = document.getElementById("deleteAllButton");
  const highList = document.getElementById("highList");
  const mediumList = document.getElementById("mediumList");
  const lowList = document.getElementById("lowList");
  const prioritySelect = document.getElementById("prioritySelect");
  const completedList = document.getElementById("completedList");

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
    todos.forEach((todo) => {
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
      } else {
        if (todo.priority === "high") {
          highList.appendChild(todoItem);
        } else if (todo.priority === "medium") {
          mediumList.appendChild(todoItem);
        } else {
          lowList.appendChild(todoItem);
        }
      }
    });
  }

  renderTodos();

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

if (window.location.pathname == "/login.html") {
  // Login
  const loginButton = document.getElementById("loginButton");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const user = localStorage.getItem("user");

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username && password) {
      if (user) {
        const parsedUser = JSON.parse(user);
        if (
          parsedUser.username === username &&
          parsedUser.password === password
        ) {
          window.location.href = "app.html";
        } else {
          alert("Invalid username or password");
        }
      }
    } else {
      alert("Please enter username and password");
    }
  });
}

if (window.location.pathname == "/signup.html") {
  // Sign Up
  const signupButton = document.getElementById("signupButton");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  signupButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Store Data To Local Storage
    localStorage.setItem("user", JSON.stringify({ username, password }));
    window.location.href = "login.html";
  });
}

if(window.location.pathname == "/index.html") {
    const addTaskButton = document.getElementById("addTaskButton");
    addTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        const alertLogin = document.getElementById("alert-login");

        alertLogin.classList.toggle("hidden");
    });
}
