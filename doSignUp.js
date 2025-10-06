// Sign Up
const signupButton = document.getElementById("signupButton");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const user = localStorage.getItem("user");

signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const parsedUser = JSON.parse(user);

  // Store Data To Local Storage
  if (username && password) {
    if (parsedUser.username === username) {
      alert("Username already exists");
    } else {
      localStorage.setItem("user", JSON.stringify({ username, password }));
      window.location.href = "/login.html";
    }
  } else {
    alert("Please enter username and password");
  }
});
