const sequelize = require('../config/connection');
const { User, post, comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const posta of postData) {
    await post.create({
      ...posta,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const posta of commentData) {
    await comment.create({
      ...posta,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
