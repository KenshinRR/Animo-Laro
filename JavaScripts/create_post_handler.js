import DataBaseManager from '../Contoller/DatabaseManager.js'

// Declaration of elements
const back_button = document.getElementById("back_button");

back_button.addEventListener("click", () => window.location.href = "/Pages/main_feed.html")

// Fetching to get session data


document.getElementById("post_form").addEventListener("submit", async function(event) {
  event.preventDefault(); // prevent page reload

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
  var currentUserData = await DataBaseManager.getCurrentUser();
  if (!currentUserData)
  {
    alert("Not logged in!");
    return;
  }
  else
  {
    console.log("Current user " + currentUserData.username);
  }
  var poster_name = currentUserData.username;

  await SaveToDatabase(title, poster_name, currentUserData._id ,desc, linkValue);
  
  // Clear inputs
  document.getElementById("input_title").value = "";
  document.getElementById("input_desc").value = "";
  document.getElementById("input_link").value = "";
  
  alert("Successfuly added post!");

  // Switch back to main feed
  window.location.href = "/Pages/main_feed.html"
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

async function SaveToDatabase(title, poster_name, poster_id, desc, linkValue)
{
  console.log("Saving these values ", title, poster_name, poster_id, desc, linkValue);
  // Add new values as an object (or array, depending on your preference)
  await DataBaseManager.addPost(
    {
        "title": title,
        "poster_name": poster_name,
        "poster_id": poster_id,
        "description" : desc,
        "likes": 0,
        "link" : linkValue
    }
  );
}