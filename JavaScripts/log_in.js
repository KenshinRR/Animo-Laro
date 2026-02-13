initializeUsers();
checkCurrentUser();

const login_form = document.getElementById('log_in');

    login_form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevents page reloading on submit

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember_me = document.getElementById('remember_me').checked;
    
        // get the users or create a new array if null
    const users = JSON.parse(localStorage.getItem("users"));

    if(!users){
        alert("user lists doesn't exist")
    }

    const user = users.find(u => u.username === username &&
        u.password === password);

    if(user){
        console.log(remember_me);
        if(remember_me){
            const user_login_data = {
                user: user,
                expires: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
            };
            localStorage.setItem("currentUser", JSON.stringify(user_login_data));
        }
        else{
            sessionStorage.setItem("currentUser", JSON.stringify(user));
        }
    
        window.location.href = "main_feed.html";
    }
    else{
        alert("Invalid username or password.");
    }

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

// if on remember me, skip log in page
function checkCurrentUser(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(currentUser){
        window.location.href = "main_feed.html";
    }
}