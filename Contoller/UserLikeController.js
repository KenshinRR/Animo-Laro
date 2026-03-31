import User_Like from "../Models/Schemas/User_Like.js";

export const toggleLike = async (req, res) => {
  try {
    const { user_id, post_id, like_Value } = req.body;

    if (![1, -1].includes(like_Value)) {
      return res.status(400).json({ error: "like_Value must be 1 or -1" });
    }

    let existing = await User_Like.findOne({ user_id, post_id });

    if (existing) {
      if (existing.like_Value === like_Value) {
        await User_Like.deleteOne({ _id: existing._id });
        return res.json({ message: "Vote removed", vote: 0 });
      }

      existing.like_Value = like_Value;
      await existing.save();
      return res.json({ message: "Vote updated", vote: like_Value });
    } else {
      const newVote = new User_Like({ user_id, post_id, like_Value });
      await newVote.save();
      return res.json({ message: "Vote added", vote: like_Value });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostVotes = async (req, res) => {
  try {
    const { post_id } = req.params;

    const votes = await User_Like.find({ post_id });

    const totalLikes = votes.filter(v => v.like_Value === 1).length;
    const totalDislikes = votes.filter(v => v.like_Value === -1).length;

    res.json({ likes: totalLikes, dislikes: totalDislikes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};