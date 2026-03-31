// declaring the element variables
const login_button = document.getElementById("login_button"); // Login button
const profile_icon_button = document.getElementById("profile_icon_button");
const nav_button = document.getElementById("navigation_button");
const left_bar = document.getElementById("left_bar_container");
const logout_button = document.getElementById("logout_button");
const left_bar_view_profile = document.getElementById("left_bar_view_profile");
const left_bar_edit_profile = document.getElementById("left_bar_edit_profile");
const create_post_button = document.getElementById("create_post_button");
const post_clickable_elements = document.getElementsByClassName("post_clickable");
const poster_clickable_elements = document.getElementsByClassName("poster_clickable");

// Adding the events
login_button.addEventListener("click", () => window.location.href = "/Pages/login_page.html");
profile_icon_button.addEventListener("click", ViewProfilePage);
left_bar_view_profile.addEventListener("click", ViewProfilePage);
left_bar_edit_profile.addEventListener("click", () => window.location.href = "/Pages/profile_edit.html");
nav_button.addEventListener("click", ToggleLeftBar);
logout_button.addEventListener("click", OnLogOutUser);
create_post_button.addEventListener("click", () => window.location.href = "/Pages/create_post_page.html");

for (let i = 0; i < post_clickable_elements.length; i++)
{
    post_clickable_elements[i].addEventListener("click", ViewSpecificPostPage);
}

for (let i = 0; i < poster_clickable_elements.length; i++)
{
    poster_clickable_elements[i].addEventListener("click", ViewSpecificPoster);
}

checkCurrentUser();

// Current user logged in
// var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// // if empty check in the session log
// if (!currentUser) currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

// // If user logs in already, hide the login button
// if (currentUser) 
// {
//     login_button.style.display = "none";
//     profile_icon_button.style.display = "block";
//     create_post_button.style.display = "block";
// }
// else
// {
//     login_button.style.display = "block";
//     profile_icon_button.style.display = "none";
//     create_post_button.style.display = "none";
// }

// Toggling of left bar
var left_bar_toggled = false;
ToggleLeftBar();

function ToggleLeftBar()
{
    if (left_bar_toggled)
    {
        left_bar.style.display = "block";
    }
    else
    {
        left_bar.style.display = "none";
    }

    left_bar_toggled = !left_bar_toggled;
}

// On log out
async function OnLogOutUser()
{
    try {
        await fetch('https://animo-laro.onrender.com/api/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
        console.error("Error logging out:", err);
    }
    
    window.location.href = "/Pages/login_page.html";
}

// ON viewing profile page
function ViewProfilePage()
{
    //window.location.href = "/Pages/profile_view.html"
    window.location.href = "/api/profile?edit=false";
}

// Viewing of specific post
function ViewSpecificPostPage(e)
{
    var post_parent = e.target.parentNode;
    // console.log(post_parent.dataset.post_id);
    window.location.href = "/Pages/view_post_page.html?id="+post_parent.dataset.post_id;
}

function ViewSpecificPoster(e)
{
    // To be implemented
}


async function checkCurrentUser() {
    try {
        const res = await fetch('https://animo-laro.onrender.com/api/me', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        if (!res.ok) {
            login_button.style.display = "block";
            profile_icon_button.style.display = "none";
            create_post_button.style.display = "none";
            return;
        }
        const data = await res.json();
        if(!data){
            window.location.href = "/Pages/login_page.html";
            return;
        }

        const currentUser = data.user;

        login_button.style.display = "none";
        profile_icon_button.style.display = "block";
        create_post_button.style.display = "block";

        console.log("Logged in as:", data.user.username);

    } catch (err) {
        console.error("Error checking current user:", err);
        login_button.style.display = "block";
        profile_icon_button.style.display = "none";
        create_post_button.style.display = "none";
    }
}