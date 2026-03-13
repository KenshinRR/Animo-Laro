// initializeUsers();

let errorMSG =  document.getElementById('error-msg');

checkCurrentUser();

const login_form = document.getElementById('log_in');

    login_form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevents page reloading on submit

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember_me = document.getElementById('remember_me').checked;

    if(!username || !password){
        errorMSG.textContent = 'Please fill in all fields.';
        return;
    }

    fetch('/api/login',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,password})
    }).then(res=> res.json()).then(data=>{
        if(data.error){
            errorMSG.textContent = data.error;
            return;
        }

        if(remember_me){
                    const user_login_data = {
                        user: {
                            _id: data.user._id,
                            user_id: data.user.user_id,
                            username: data.user.username,
                            bio: data.user.bio,
                            avatar: data.user.avatar
                        },
                        expires: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
                    };
                    localStorage.setItem("currentUser", JSON.stringify(user_login_data));
        }
        else{
            sessionStorage.setItem("currentUser", JSON.stringify({    
                _id: data.user._id,
                user_id: data.user.user_id,
                username: data.user.username,
                bio: data.user.bio,
                avatar: data.user.avatar}));
            }
        window.location.href = "main_feed.html";
    }).catch(err=>console.error('Login: error:',err));

    // get the users or create a new array if null
    // const users = JSON.parse(localStorage.getItem("users"));

    // if(!users){
    //     alert("user lists doesn't exist")
    // }

    // const user = users.find(u => u.username === username &&
    //     u.password === password);

    // if(user){
    //     console.log(remember_me);
    //     if(remember_me){
    //         const user_login_data = {
    //             user: user,
    //             expires: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
    //         };
    //         localStorage.setItem("currentUser", JSON.stringify(user_login_data));
    //     }
    //     else{
    //         sessionStorage.setItem("currentUser", JSON.stringify(user));
    //     }
    
    //     window.location.href = "main_feed.html";
    // }
    // else{
    //     alert("Invalid username or password.");
    // }

});

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
