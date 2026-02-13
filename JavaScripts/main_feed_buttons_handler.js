// declaring the element variables
const login_button = document.getElementById("login_button"); // Login button
const profile_icon_button = document.getElementById("profile_icon_button");

// Adding the events
login_button.addEventListener("click", () => window.location.href="/Pages/login_page.html");
profile_icon_button.addEventListener("click", () => window.location.href="/Pages/profile_view.html")

// Current user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// if empty check in the session log
if (!currentUser) currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

// If user logs in already, hide the login button
if (currentUser) 
{
    login_button.style.display = "none";
    profile_icon_button.style.display = "block";
}
else
{
    login_button.style.display = "block";
    profile_icon_button.style.display = "none";
}