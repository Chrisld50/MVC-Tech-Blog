const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 3,
    comment_text: 'I should sell now!'
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: 'I am waiting for it to go on sale before I get it, nobody has money lik that!'
  },
  {
    user_id: 3,
    post_id: 2,
    comment_text: 'Interesting, but im a vanilla javascript kinda guy.'
  },
  {
    user_id: 4,
    post_id: 5,
    comment_text: 'Thank you! My desktop is really starting to get dirty!'
  },
  {
    user_id: 5,
    post_id: 4,
    comment_text: 'I am so excited! this game looks amazing!'
  },
 
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
