const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            post_id: req.session.post_id,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a post with id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['username']
                }],
            },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: 'Cannot locate a post with this id.' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // await Comment.destroy({
        //     where: { post_id: req.params.id },
        // });
        const deletedPost = await Post.destroy({
            where: { 
                id: req.params.id, 
                user_id: req.session.user_id,
            },
        });
        if (!deletedPost) {
            res.status(404).json({ message: 'Cannot locate a post with this id.' });
            return;
        } res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updatePost) {
            res.status(404).json({ message: 'Cannot locate a post with this id.' });
            return;
        } res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all post
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;