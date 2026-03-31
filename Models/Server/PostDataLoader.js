import Post from "../Schemas/Post.js";

export async function getAllPosts() {
  return await Post.find();
}

export async function createPost(title, poster_name, poster_id, description, likes, link) {

  const newPost = new Post({
    title,
    poster_name,
    poster_id,
    description,
    likes,
    link
  });
  
  await newPost.save();

  return newPost;
}

export async function getSpecificPost(id){

  const post = await Post.findById(id);
  return post;    
}

export async function editPost(id, post_data){
  const post_status = await Post.findByIdAndUpdate(id, post_data);
  return post_status;
}

export async function deletePostByID(id){

  const post_status = await Post.findByIdAndDelete(id);
  return post_status;    
}