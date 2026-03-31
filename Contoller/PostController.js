import * as postDB from "../Models/Server/PostDataLoader.js"

export async function getPosts(req, res) {

  try {

    const posts = await postDB.getAllPosts();
    res.json(posts);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: err.message });

  }

}

export async function createPost(req, res) {

  try {
    console.log(req.body);
    const post = await postDB.createPost(
      req.body.title,
      req.body.poster_name,
      req.body.poster_id,
      req.body.description,
      req.body.likes,
      req.body.link
    );

    res.status(201).json(post);

  } catch (err) {
    
    res.status(500).json({ error: err.message });

  }

}

export async function getSpecificPost(req, res) {
  try {
    // console.log("Looking for post " + req.params.id);
    const post = await postDB.getSpecificPost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function editPost(req, res) {
  try {
    const post_status = await postDB.editPost(req.body.id, req.body.post_data);

    res.status(201).json(post_status);
  }
  catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function deletePostByID(req, res) {
  try {
    const post_status = await postDB.deletePostByID(req.params.id);

    res.status(201).json(post_status);
  }
  catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: err.message });
  }
}