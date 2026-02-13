// Login button
const login_button = document.getElementById("login_button");
login_button.addEventListener("click", () => window.location.href="/Pages/login_page.html");

// Current user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// if empty check in the session log
if (!currentUser) currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

// If user logs in already, hide the login button
if (currentUser) login_button.style.display = "none";