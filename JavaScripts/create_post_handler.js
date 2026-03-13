import DataBaseManager from '../Contoller/DatabaseManager.js';

// Declaration of elements
const back_button = document.getElementById("back_button");

back_button.addEventListener("click", () => window.location.href="/Pages/main_feed.html")

document.getElementById("post_form").addEventListener("submit", function(event) {
  event.preventDefault(); // prevent page reload

  const title_input = document.getElementById("input_title");
  const desc_input = document.getElementById("input_desc");

  // Get values from inputs
  const desc = document.getElementById("input_desc").value;
  const title = document.getElementById("input_title").value;
  const link = document.getElementById("input_link");
  let linkValue = link.value;

  link.addEventListener("input", function() {
    this.setCustomValidity(''); // clears error message
  });

  if(linkValue.trim() === ""){
    linkValue = "";
  }

  if(!CheckValidURL(linkValue)){
    link.setCustomValidity('Please enter a valid URL');
    link.reportValidity();
    return;
  }

  // Get the poster username from storage
  var currentUserData = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUserData) currentUserData = JSON.parse(sessionStorage.getItem("currentUser"));
  var poster = currentUserData.username;

  SaveToDatabase();

  // Optional: clear inputs
  document.getElementById("input_title").value = "";
  document.getElementById("input_desc").value = "";
  document.getElementById("input_link").value = "";

  console.log("Succesfuly made");
  
  // Switch back to main feed
  window.location.href="/Pages/main_feed.html"
});

function CheckValidURL(string){
  if(string.length === 0){
    return true;
  }
  try {
    // try default
    new URL(string);
    return string.includes('.');  // should at least have a dot
  } catch {
    // add https:// to the link to check if it's still invalid
    try {
      new URL('https://' + string);
      return string.includes('.');
    } catch {
      return false;
    }
  }
}

function SaveToDatabase()
{
  // Retrieve existing list from localStorage (or start with empty array)
  let savedPosts= JSON.parse(localStorage.getItem("posts")) || [];

  // Add new values as an object (or array, depending on your preference)
  DataBaseManager.addPost(
    {
        "title": title,
        "poster": poster,
        "description" : desc,
        "likes": 0,
        "link" : linkValue
    }
  );

  // Save back to localStorage
  localStorage.setItem("posts", JSON.stringify(savedPosts));
}