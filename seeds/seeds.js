const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData');
const postData = require('./postData');
const commentData = require('./commentData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const posts = await Post.bulkCreate(postData, {
        returning: true,
    });

    const comments = await Comment.bulkCreate(commentData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();