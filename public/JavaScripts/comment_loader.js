// Loading comments from database
fetch("/JSON files/comments_database.json")
  .then(response => response.json())
  .then(commentsData => {

    // Get comments from localStorage
    const localComments = JSON.parse(localStorage.getItem("comments")) || [];

    // Create a copy of JSON comments
    const allComments = [...commentsData];

    // Merge localStorage comments
    localComments.forEach(localComment => {

        // Check if comment already exists
        const exists = allComments.some(c => 
            c.comment_id === localComment.comment_id
        );

        if (!exists) {
            allComments.push(localComment);
        }
    });

    // Save merged list back to localStorage
    localStorage.setItem("comments", JSON.stringify(allComments));

    console.log("Comments loaded successfully:", allComments);
  })
  .catch(error => console.error("Error loading JSON:", error));
