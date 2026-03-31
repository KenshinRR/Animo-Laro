import DatabaseManager from '../Contoller/DatabaseManager.js';

let comments = [];
let currentUser = null;

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const postLikeBtn = document.getElementById("post_like_btn");
const postDislikeBtn = document.getElementById("post_dislike_btn");
const postLikesDisplay = document.getElementById("post_likes_display");

// --- Initialize comments ---
async function initComments() {
    currentUser = await DatabaseManager.getCurrentUser();

    try {
        const res = await fetch(`/api/comments/${postId}`);
        const commentsData = await res.json();

        const commentMap = {};
        comments = commentsData.map(c => {
            const obj = {
                id: c._id,  
                username: c.user_id?.username || "Anonymous",
                text: c.description,
                likes: c.likes || 0,
                dislikes: c.dislikes || 0,
                edited: c.edited || false,
                userVote: null,
                parent_comment_id: c.parent_comment_id || null,
                replies: []
            };
            commentMap[obj.id] = obj;
            return obj;
        });

        // Attach replies to parents
        comments.forEach(c => {
            if (c.parent_comment_id && commentMap[c.parent_comment_id]) {
                commentMap[c.parent_comment_id].replies.push(c);
            }
        });

        // Filter out replies from root list
        comments = comments.filter(c => !c.parent_comment_id);

        renderComments();
    } catch (err) {
        console.error("Error loading comments:", err);
    }
}

// --- Render comments ---
function renderComments() {
    const container = document.getElementById("comments_container");
    container.innerHTML = '';
    comments.forEach(c => container.appendChild(renderCommentElement(c)));
}

function renderCommentElement(comment) {
    const div = document.createElement("div");
    div.className = "comment";

    // Header
    const header = document.createElement("div");
    header.className = "comment_header";
    header.textContent = comment.username;
    div.appendChild(header);

    // Text
    const text = document.createElement("div");
    text.className = "comment_text";
    text.textContent = comment.text;
    if (comment.edited) {
        const editedSpan = document.createElement("span");
        editedSpan.textContent = " (edited)";
        text.appendChild(editedSpan);
    }
    div.appendChild(text);

    // Actions
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
    editBtn.style.display = currentUser && currentUser.username === comment.username ? "inline-block" : "none";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.display = currentUser && currentUser.username === comment.username ? "inline-block" : "none";

    const likesDisplay = document.createElement("span");
    likesDisplay.textContent = "Likes: " + (comment.likes - comment.dislikes);

    actions.append(likeBtn, dislikeBtn, likesDisplay, editBtn, deleteBtn);
    div.appendChild(actions);

    // Recursive replies
    comment.replies.forEach(reply => div.appendChild(renderCommentElement(reply)));

    return div;
}

// --- Utility functions ---
function findCommentById(id, list) {
    for (const c of list) {
        if (c.id === id) return c;
        const found = findCommentById(id, c.replies);
        if (found) return found;
    }
    return null;
}

function deleteCommentById(id, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
            return true;
        } else if (list[i].replies.length > 0) {
            if (deleteCommentById(id, list[i].replies)) return true;
        }
    }
    return false;
}

async function voteComment(id, voteType) {
    await fetch(`/api/comment_vote/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: voteType })
    });
}

// --- Submit new comment ---
document.getElementById("comment_form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const input = document.getElementById("comment_input");
    const text = input.value.trim();
    if (!text) return;

    try {
        const res = await fetch('/api/create_comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: text,
                post_id: postId,
                user_id: currentUser?._id
            })
        });

        const newComment = await res.json();
        const commentObj = {
            id: newComment._id,
            username: newComment.user_id?.username || "Anonymous",
            text: newComment.description,
            likes: newComment.likes,
            dislikes: newComment.dislikes,
            edited: newComment.edited,
            userVote: null,
            parent_comment_id: newComment.parent_comment_id || null,
            replies: []
        };

        if (commentObj.parent_comment_id) {
            const parent = findCommentById(commentObj.parent_comment_id, comments);
            if (parent) parent.replies.push(commentObj);
        } else {
            comments.push(commentObj);
        }

        input.value = '';
        renderComments();

    } catch (err) {
        console.error("Failed to add comment:", err);
    }
});

// --- Initialize ---
initComments();