let post = 
{
    likes: 0,
    dislikes: 0,
    userVote: null
};

const postLikeButtons = document.getElementsByClassName("post_like_btn");
const postDislikeButtons = document.getElementsByClassName("post_dislike_btn");
const postLikesDisplay = document.getElementById("post_likes_display");

console.log("postLikeButtons amount " + postLikeButtons)

function updatePostDisplay() 
{
    const netLikes = post.likes - post.dislikes;
    postLikesDisplay.textContent = "Likes: " + netLikes;

    postLikeBtn.classList.remove("vote_active_like");
    postDislikeBtn.classList.remove("vote_active_dislike");

    if (post.userVote === "like") 
        {
            postLikeBtn.classList.add("vote_active_like");
        } 
    else if (post.userVote === "dislike") 
        {
            postDislikeBtn.classList.add("vote_active_dislike");
        }
}

for (const like_btn of postLikeButtons){
    like_btn.onclick = () => 
    {
        if (post.userVote !== "like")
        {
            if (post.userVote === "dislike") 
                {
                    post.dislikes--;
                }

            post.likes++;
            post.userVote = "like";
        }
        else 
            {
                post.likes--;
                post.userVote = null;
            }

        updatePostDisplay();
    };
};

for (const dislike_btn of postDislikeButtons){
    dislike_btn.onclick = () => {
        if (post.userVote !== "dislike")
        {
            if (post.userVote === "like") 
                {
                    post.likes--;
                }

            post.dislikes++;
            post.userVote = "dislike";
        }
        else 
            {
                post.dislikes--;
                post.userVote = null;
            }
        updatePostDisplay();
    };
};