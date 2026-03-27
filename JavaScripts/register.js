checkCurrentUser();

let userErrorMSG = document.getElementById("user-error-msg");
let passErrorMSG = document.getElementById("pass-error-msg");

const register_form = document.getElementById("register_form");

register_form.addEventListener("submit", function (event) {
  // prevents page reloading on submit
  event.preventDefault();

  let hasErrors = false;

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || username.length < 3 || username.length > 15) {
    userErrorMSG.textContent = "Username must be 3–15 characters.";
    hasErrors = true;
  }

  if (password.length < 8) {
    errorMSG.textContent = "Password must at least contain 8 characters.";
    hasErrors = true;
  }
  if (hasErrors) {
    return;
  }

  fetch("https://animo-laro.onrender.com/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        if (data.errors.username) {
          userErrorMSG.textContent = data.errors.username;
        }

        if (data.errors.password) {
          passErrorMSG.textContent = data.errors.password;
        }

        return;
      }
      window.location.href = "login_page.html";
    })
    .catch((err) => console.error("Register error:", err));
});

// if on remember me, skip log in page
async function checkCurrentUser() {
  try {
    const res = await fetch("https://animo-laro.onrender.com/api/me", {
      credentials: "include",
    });
    if (res.ok) {
      window.location.href = "main_feed.html";
    }
  } catch (err) {
    console.error("Error checking session:", err);
  }
}
