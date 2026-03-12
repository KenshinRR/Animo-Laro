let comments = [];
let commentIdCounter = 0;

let post = {
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

    if (post.userVote === "like") postLikeBtn.classList.add("vote_active_like");
    else if (post.userVote === "dislike") postDislikeBtn.classList.add("vote_active_dislike");
}

postLikeBtn.onclick = () => {
    if (post.userVote !== "like") {
        if (post.userVote === "dislike") post.dislikes--;
        post.likes++;
        post.userVote = "like";
    } else {
        post.likes--;
        post.userVote = null;
    }
    updatePostDisplay();
};

postDislikeBtn.onclick = () => {
    if (post.userVote !== "dislike") {
        if (post.userVote === "like") post.likes--;
        post.dislikes++;
        post.userVote = "dislike";
    } else {
        post.dislikes--;
        post.userVote = null;
    }
    updatePostDisplay();
};

function createCommentObject(rawComment) {
    return {
        id: rawComment.comment_id,
        username: "user",
        text: rawComment.description,
        likes: rawComment.likes || 0,
        dislikes: rawComment.dislikes || 0,
        edited: rawComment.edited || false,
        userVote: null,
        replies: []
    };
}

Promise.all([
    fetch("../JSON files/comments_database.json").then(res => res.json()),
    fetch("../JSON files/comment_comment_database.json").then(res => res.json())
])
.then(([commentsData, relationsData]) => {

    comments = commentsData.map(comment => createCommentObject(comment));

    if (comments.length > 0) commentIdCounter = Math.max(...comments.map(c => c.id)) + 1;

    const commentMap = {};
    comments.forEach(comment => commentMap[comment.id] = comment);

    relationsData.forEach(relation => {
        const parent = commentMap[relation.parent_comment_id];
        const child = commentMap[relation.comment_under_id];
        if (parent && child) parent.replies.push(child);
    });

    const childIds = relationsData.map(r => r.comment_under_id);
    comments = comments.filter(c => !childIds.includes(c.id));

    renderComments();
})
.catch(error => console.error("Error loading comments:", error));

document.getElementById("comment_form")
.addEventListener("submit", function(e) {
    e.preventDefault();
    const input = document.getElementById("comment_input");
    const text = input.value.trim();
    if (text === "") return;

    comments.push({
        id: commentIdCounter++,
        username: "user",
        text: text,
        likes: 0,
        dislikes: 0,
        edited: false,
        userVote: null,
        replies: []
    });

    input.value = "";
    renderComments();
});

function renderComments() {
    const container = document.getElementById("comments_container");
    container.innerHTML = "";
    comments.forEach(comment => container.appendChild(renderCommentElement(comment)));
}

function renderCommentElement(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const header = document.createElement("div");
    header.className = "comment_header";
    header.textContent = comment.username;

    const text = document.createElement("div");
    text.className = "comment_text";
    text.textContent = comment.text;

    if (comment.edited) {
        const editedIndicator = document.createElement("span");
        editedIndicator.textContent = " (edited)";
        text.appendChild(editedIndicator);
    }

    const actions = document.createElement("div");
    actions.className = "comment_actions";

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Like";
    if (comment.userVote === "like") likeBtn.classList.add("comment_like_active");

    const dislikeBtn = document.createElement("button");
    dislikeBtn.textContent = "Dislike";
    if (comment.userVote === "dislike") dislikeBtn.classList.add("comment_dislike_active");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    const likesDisplay = document.createElement("span");
    likesDisplay.textContent = "Likes: " + (comment.likes - comment.dislikes);

    likeBtn.onclick = () => {
        if (comment.userVote === "like") {
            comment.likes--;
            comment.userVote = null;
        } else {
            if (comment.userVote === "dislike") comment.dislikes--;
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
            if (comment.userVote === "like") comment.likes--;
            comment.dislikes++;
            comment.userVote = "dislike";
        }
        renderComments();
    };

    editBtn.onclick = () => {
        const newText = prompt("Edit comment:", comment.text);
        if (!newText || newText.trim() === "") return;
        comment.text = newText.trim();
        comment.edited = true;
        renderComments();
    };

    deleteBtn.onclick = () => {
        if(deleteCommentById(comment.id, comments)) renderComments();
    };

    actions.appendChild(likeBtn);
    actions.appendChild(dislikeBtn);
    actions.appendChild(likesDisplay);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    commentDiv.appendChild(header);
    commentDiv.appendChild(text);
    commentDiv.appendChild(actions);

    comment.replies.forEach(reply => commentDiv.appendChild(renderCommentElement(reply)));

    // Placeholder for logged-in user check for edit/delete
    // if(currentUser === comment.username) { show editBtn and deleteBtn }

    return commentDiv;
}

function deleteCommentById(id, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
            return true;
        } else if (list[i].replies.length > 0) {
            const deleted = deleteCommentById(id, list[i].replies);
            if (deleted) return true;
        }
    }
    return false;
}