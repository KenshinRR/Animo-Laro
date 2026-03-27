checkCurrentUser();

let errorMSG = document.getElementById("error-msg");

const register_form = document.getElementById("register_form");

register_form.addEventListener("submit", function (event) {
  // prevents page reloading on submit
  event.preventDefault();

  console.log('test');

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    errorMSG.textContent = "Please fill in all fields.";
    return;
  }

  if (!isStrongPassword(password)) {
    errorMSG.textContent =
      "Password must be at least contain 8 characters, an uppercase letter, a number, and a special character.";
    return;
  }

  fetch("https://animo-laro.onrender.com/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        errorMSG.textContent = data.error;
        return;
      }
      window.location.href = "login_page.html";
    })
    .catch((err) => console.error("Register error:", err));
});

function isStrongPassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;

  return hasUppercase && hasNumber && hasSpecialChar && hasMinLength;
}

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
