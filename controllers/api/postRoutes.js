const router = require('express').Router();
const {User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth ,async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'post_content', 'user_id', 'date_created'],
      order: [['date_created', 'DESC']],
      include: [
        { model: User, attributes: ['name'] }, {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id']} 
      ],
    });
    res.status(200).json(postData.reverse());
  } catch (err) {
    res.status(400).json(err);
  }
});
//create route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    console.log('test')
    const newPost = await Post.create({
      
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where:{
        id: req.params.id
      },
      attributes: [ 'id', 'title', 'date_created', 'post_content'],
      include: [
        {
          model: User,
          attributes: ['name'], 
        }, 
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id']
        } 
      ],
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json()
          return;
        }
        res.json(postData)
      }) 

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;