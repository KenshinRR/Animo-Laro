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

    fetch('https://animo-laro.onrender.com/api/login',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, remember_me})
    })
    .then(res=> res.json())
    .then(data=>{
        if(data.error){
            errorMSG.textContent = data.error;
            return;
        }
        window.location.href = "main_feed.html";
    }).catch(err=>console.error('Login: error:',err));
});


function checkCurrentUser(){
    fetch('https://animo-laro.onrender.com/api/me')
    .then(res => {
        if(!res.ok){
            throw new Error('Not logged in.');
        }
        return res.json();
    })
    .then(data => {
        window.location.href = 'main_feed.html';
    })
    .catch(err => {
        // not logged in → stay on login page
        console.log("Not logged in");
    });
}