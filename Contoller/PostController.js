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

    const post = await postDB.createPost(req.body);

    res.status(201).json(post);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

}

export async function getSpecificPost(req, res) {
  try {
    console.log("Looking for post " + req.params.id);
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