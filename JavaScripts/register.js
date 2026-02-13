initializeUsers();

const register_form = document.getElementById("register_form");

register_form.addEventListener('submit', function(event) {
    // prevents page reloading on submit
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // get the users or create a new array if null
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.username === username);
    if(userExists){
        alert("Username already exists!"); // temporary message for now
        register_form.reset();
        return;
    }

    // generate new user id
    const newUserID = crypto.randomUUID();
    // create the new user
    const newUser = {
        "user_id": newUserID,
        "username": username,
        "password": password,
        "bio": "Add a bio...",
        "avatar": "default_avatar"
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "main_feed.html"
});


// fetch users from json file and merge it with localStorage users (temporarily for now)
// use localStorage for now for saved user data
function initializeUsers() {
    // fetch users from users_database.json
    fetch("../JSON files/users_database.json")
        .then(response => response.json())
        .then(jsonUsers => {
            // get the users from localStorage
            const localUsers = JSON.parse(localStorage.getItem("users")) || [];
            
            // create a copy of jsonUsers
            const allUsers = [...jsonUsers];
            localUsers.forEach(localUser => {
                // check if the same user exist across the two user data
                const exists = allUsers.some(u => u.user_id === localUser.user_id);
                if (!exists) {
                    // add the user to the user list
                    allUsers.push(localUser);
                }
            });
            
            // save the new users to the local storage
            localStorage.setItem("users", JSON.stringify(allUsers));
        })
        .catch(error => console.error("Error loading users:", error));
}