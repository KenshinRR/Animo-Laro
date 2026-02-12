const login_form = document.getElementById('log_in');

if(!login_form){
    console.error('log in form missing');
}
else{
     login_form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevents from submitting to a server

        const username = document.getElementById('username').value;

        const password = document.getElementById('password').value;

        if(username !== "Nikos" || password !== "Firefly"){
            window.open("https://youtu.be/dQw4w9WgXcQ", "_blank");  
        }
        else{
            window.location.href="main_feed.html";
        }
     });
}
