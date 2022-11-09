const { User } = require('../models');

const userData = [
  {
    name: 'Alex',
    email: 'Alex123@test.com',
    password: 'Coding1'

  },
  {
    name: 'David',
    email: 'David123@test.com',
    password: 'Coding2'

  },
  {
    name: 'Sarah',
    email: 'Sarah123@test.com',
    password: 'Coding3'

  },
  {
    name: 'Jeremy',
    email: 'Jeremy23@test.com',
    password: 'Coding4'

  },
  {
    name: 'Jen',
    email: 'Jen123@test.com',
    password: 'Coding5'

  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
