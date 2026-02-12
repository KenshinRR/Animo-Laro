let comments = [];
let commentIdCounter = 0;

let post = 
{
    likes: 0,
    dislikes: 0,
    userVote: null
};

const postLikeBtn = document.getElementById("post_like_btn");
const postDislikeBtn = document.getElementById("post_dislike_btn");
const postLikesDisplay = document.getElementById("post_likes_display");

function updatePostDisplay() {
    const netLikes = post.likes - post.dislikes;
    postLikesDisplay.textContent = "Likes: " + netLikes;

    postLikeBtn.classList.remove("vote_active_like");
    postDislikeBtn.classList.remove("vote_active_dislike");

    if (post.userVote === "like") {
        postLikeBtn.classList.add("vote_active_like");
    } else if (post.userVote === "dislike") {
        postDislikeBtn.classList.add("vote_active_dislike");
    }
}

postLikeBtn.onclick = () => 
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

postDislikeBtn.onclick = () => {
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

updatePostDisplay();

function createCommentObject(text) {
    return {
        id: commentIdCounter++,
        username: "user", //Placeholder
        text: text,
        likes: 0,
        dislikes: 0,
        userVote: null,
        replies: []
    };
}

document.getElementById("comment_form")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const input = document.getElementById("comment_input");
    const text = input.value.trim();

    if (text === "") return;

    comments.push(createCommentObject(text));
    input.value = "";

    renderComments();
});

function renderComments() {
    const container = document.getElementById("comments_container");
    container.innerHTML = "";

    comments.forEach(comment => {
        container.appendChild(renderCommentElement(comment));
    });
}

function renderCommentElement(comment) {

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const header = document.createElement("div");
    header.className = "comment_header";
    header.textContent = comment.username;

    const text = document.createElement("div");
    text.textContent = comment.text;

    const netLikes = comment.likes - comment.dislikes;

    const actions = document.createElement("div");
    actions.className = "comment_actions";

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Like";

    const dislikeBtn = document.createElement("button");
    dislikeBtn.textContent = "Dislike";

    const likesDisplay = document.createElement("span");
    likesDisplay.textContent = "Likes: " + netLikes;

    const replyBtn = document.createElement("button");
    replyBtn.textContent = "Reply";

    likeBtn.onclick = () => {
        if (comment.userVote === "like") {
            comment.likes--;
            comment.userVote = null;
        } else {
            if (comment.userVote === "dislike") {
                comment.dislikes--;
            }
            comment.likes++;
            comment.userVote = "like";
        }
        renderComments();
    };

    dislikeBtn.onclick = () => {
        if (comment.userVote === "dislike") {
            comment.dislikes--;
            comment.userVote = null;
        } else {
            if (comment.userVote === "like") {
                comment.likes--;
            }
            comment.dislikes++;
            comment.userVote = "dislike";
        }
        renderComments();
    };

    replyBtn.onclick = () => 
    {
    const existingReply = commentDiv.querySelector(".reply_container");
    if (existingReply) 
    {
        const existingText = existingReply.querySelector("textarea").value.trim();
        existingReply.remove();
    }
    else
    {
    const replyInput = document.createElement("textarea");
    replyInput.placeholder = "Write a reply...";

    const submitReply = document.createElement("button");
    submitReply.textContent = "Post Reply";

    const replyContainer = document.createElement("div");
    replyContainer.className = "reply_container";

    submitReply.onclick = () => {
        const replyText = replyInput.value.trim();
        if (replyText === "") return;

        comment.replies.push(createCommentObject(replyText));
        renderComments();
    };

    replyContainer.appendChild(replyInput);
    replyContainer.appendChild(submitReply);
    commentDiv.appendChild(replyContainer);
    }


};


    actions.appendChild(likeBtn);
    actions.appendChild(dislikeBtn);
    actions.appendChild(likesDisplay);
    actions.appendChild(replyBtn);

    commentDiv.appendChild(header);
    commentDiv.appendChild(text);
    commentDiv.appendChild(actions);

    comment.replies.forEach(reply => 
    {
        commentDiv.appendChild(renderCommentElement(reply));
    });

    return commentDiv;
}
