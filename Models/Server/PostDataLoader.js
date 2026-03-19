import Post from "../Schemas/Post.js";

export async function getAllPosts() {
  return await Post.find();
}

export async function createPost(postData) {

  const newPost = new Post(postData);
  await newPost.save();

  return newPost;
}

export async function getSpecificPost(id){

  const post = await Post.findById(id);
  return post;    
}