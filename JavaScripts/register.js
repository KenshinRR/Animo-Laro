// initializeUsers();
checkCurrentUser();

let errorMSG =  document.getElementById('error-msg');

const register_form = document.getElementById("register_form");

register_form.addEventListener('submit', function(event) {
    // prevents page reloading on submit
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if(!username || !password){
        errorMSG.textContent = 'Please fill in all fields.';
        return;
    }

    fetch('/api/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({username, password})
    }).then(res => res.json()).then(data => {
        if(data.error){
            errorMSG.textContent = data.error;
            return;
        }
        window.location.href = 'login_page.html';
    }).catch(err => console.error('Register error:', err));

    // get the users or create a new array if null
    // const users = JSON.parse(localStorage.getItem("users")) || [];

    // const userExists = users.some(user => user.username === username);
    // if(userExists){
    //     alert("Username already exists!"); // temporary message for now
    //     register_form.reset();
    //     return;
    // }

    // // generate new user id
    // const newUserID = crypto.randomUUID();
    // // create the new user
    // const newUser = {
    //     "user_id": newUserID,
    //     "username": username,
    //     "password": password,
    //     "bio": "Add a bio...",
    //     "avatar": "default_avatar"
    // }

    // users.push(newUser);
    // localStorage.setItem("users", JSON.stringify(users));

    // window.location.href = "login_page.html"
});


// fetch users from json file and merge it with localStorage users (temporarily for now)
// use localStorage for now for saved user data
// function initializeUsers() {
//     // fetch users from users_database.json
//     fetch("../JSON files/users_database.json")
//         .then(response => response.json())
//         .then(jsonUsers => {
//             // get the users from localStorage
//             const localUsers = JSON.parse(localStorage.getItem("users")) || [];
            
//             // create a copy of jsonUsers
//             const allUsers = [...jsonUsers];
//             localUsers.forEach(localUser => {
//                 // check if the same user exist across the two user data
//                 const exists = allUsers.some(u => u.user_id === localUser.user_id);
//                 if (!exists) {
//                     // add the user to the user list
//                     allUsers.push(localUser);
//                 }
//             });
            
//             // save the new users to the local storage
//             localStorage.setItem("users", JSON.stringify(allUsers));
//         })
//         .catch(error => console.error("Error loading users:", error));
// }

// if on remember me, skip log in page
function checkCurrentUser(){
    const local = JSON.parse(localStorage.getItem("currentUser"));
    if(!local){
        return;
    }
    if(local.expires && Date.now() > localUser.expires){
        localStorage.removeItem("currentUser");
    }
    else{
        window.location.href = "main_feed.html";
    }
}