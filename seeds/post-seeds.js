const { Post } = require('../models');

const postData = [
  {
    title: "new LTFC Graphics card set for release in December", 
    post_content: "The LTFC 4000 Graphic card is set to release for the holidays on December 3rd. Start saving, the price is pretty high! V1 is starting at 699.00 and the V2 is 850.00",
    user_id: 1
  },
  {
    title: "Megascript: The new coding language", 
    post_content: "If you are a Web Developer, you may be interested in the new coding language that everyone is talking about: Megascript!",
    user_id: 2
  },
  {
    title: "AlphaTec Stocks drop 5 points", 
    post_content: "If you have been watching the market, you may see the new up and coming tech company, Alphatech, lost 5 points today",
    user_id: 3
  },
  {
    title: "New MMORPG is set to change the way you game", 
    post_content: "Nordic Dream, the new MMO, is finishing up development and looking to start its beta invitations later this week",
    user_id: 4
  },
  {
    title: "How often should i clean out my desktop computer?", 
    post_content: "Today we are going to go over the proper way to clean out your computer and how often you should do it.",
    user_id: 5
  },

];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
