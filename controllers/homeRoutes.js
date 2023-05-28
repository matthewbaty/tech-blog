const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
require('dotenv').config();

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/singup', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/dashboard');
    }
    res.render('signup')
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/dashboard');
    }
    res.render('login');
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['username'],
                    }]
                }
            ],
        });
        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{
                model: User,
                attributes: ['username']
            }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newpost', (req, res) => {
    if (req.session.logged_in) {
        return res.render('newpost');
    }
    res.redirect('/login');
});

router.get('/updatepost/:id', async (req, res) => {
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

        const post = postData.get({ plain: true });

        res.render('updatepost', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;