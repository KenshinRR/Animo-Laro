const heading = document.getElementById("title_text");

// Listen for when the CSS animation ends
heading.addEventListener("animationend", () => {
  // Redirect to another page
  window.location.href = "/Animo-Laro/Pages/main_feed.html";
});