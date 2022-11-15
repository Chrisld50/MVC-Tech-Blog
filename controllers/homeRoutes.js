const router = require('express').Router();
const { Comment, Post, User } = require('../models');


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
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

    // Serialize data so the template can read it
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('posts/:id', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findByPk({
      where:{
        id: req.params.id
      },
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

    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    }) 
    res.render('login');
  } else {
    res.status(404).end();
  }
});

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/') 
    return
  }
  res.render('/')
})

  module.exports = router;