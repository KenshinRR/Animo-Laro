// Declaration of elements
const back_button = document.getElementById("back_button");

back_button.addEventListener("click", () => window.location.href="/Pages/main_feed.html")

document.getElementById("post_form").addEventListener("submit", function(event) {
  event.preventDefault(); // prevent page reload

  const title_input = document.getElementById("input_title");
  const desc_input = document.getElementById("input_desc");

  // Get values from inputs
  const desc = desc_input.value;
  const title = title_input.value;

  if (!title || !desc) {
    event.preventDefault(); // stop form submission
    alert("Title and description are required!");
    title_input.value = "";
    desc_input.value = "";
    return;
  }

  // Get the poster username from storage
  var currentUserData = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUserData) currentUserData = JSON.parse(sessionStorage.getItem("currentUser"));
  var poster = currentUserData.username;

  // Retrieve existing list from localStorage (or start with empty array)
  let savedPosts= JSON.parse(localStorage.getItem("posts")) || [];

  // Add new values as an object (or array, depending on your preference)
  savedPosts.push(
    {
        "post_id": crypto.randomUUID(),
        "title": title,
        "poster": poster,
        "description" : desc
    }
  );

  // Save back to localStorage
  localStorage.setItem("posts", JSON.stringify(savedPosts));

  // Optional: clear inputs
  document.getElementById("input_title").value = "";
  document.getElementById("input_desc").value = "";

  console.log("Succesfuly made");
  
  // Switch back to main feed
  window.location.href="/Pages/main_feed.html"
});
