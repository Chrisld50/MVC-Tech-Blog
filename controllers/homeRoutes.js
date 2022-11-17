const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const  withAuth  = require('../utils/auth');


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      attributes: ['id', 'title','post_content', 'date_created', 'user_id'],
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

router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
      where:{
        id: req.params.id
      },
      attributes: ['id', 'title', 'post_content', 'date_created', 'user_id'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          model: User,
          attributes: ['name'], 
        }, 
        {
          model: User, 
          attributes: ['name']
        } 
      ]
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post with this id'});
          return;
        }
        const post = postData.get({ plain: true })

        res.render('single-post', {
          post, 
          logged_in: req.session.logged_in
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  })




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