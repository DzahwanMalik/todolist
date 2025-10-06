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
    } else {
      alert("User not found, please sign up first.");
    }
  } else {
    alert("Please enter username and password");
  }
});
