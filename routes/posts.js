const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Get all posts
router.get("/", async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
});

// Create One Post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update One Post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can update only your own posts");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete One Post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne({$set: req.body});
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can delete only your own posts");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Like/Dislike a Post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get One Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendsPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get user's all  posts
router.get("/profile/:username", async (req, res) => {
    try {

        const user = await User.find({username: req.params.username})
        const posts = await Post.find({userId: user[0]._id})
        res.status(200).json(posts)


    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
