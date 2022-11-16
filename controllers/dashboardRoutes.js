const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        user_id: req.session.user_id,
        include: [
          {
            model: User,
            attributes: ['name'], 
          }, 
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id']
          } 
        ],order: [
          ['date_created', 'ASC'],
      ],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create/', withAuth, async (req, res) =>{
    try {
    const postData = await Post.findAll({
      user_id: req.session.user_id,
        include: [
          {
            model: User,
            attributes: ['name'], 
          }, 
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id']
          } 
        ],order: [
          ['date_created', 'ASC'],
      ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('create-post', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router