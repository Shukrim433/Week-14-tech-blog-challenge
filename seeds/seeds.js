const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //seed users:
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //seed posts:
  const posts = []
  for (const post of postData) {
    const newPost = await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,  // randomly assigns a user_id to each post in the posts seed data array
      });
    posts.push(newPost)
  }

  //seed comments:
  for (const comment of commentData) {
    await Comment.create({   
      ...comment,
      post_id: posts[Math.floor(Math.random() * posts.length)].id, // randomly assigns a post to each comment in the comment seed array (this is the foreign key column for each comment)
    });
  }

  process.exit(0);
};

seedDatabase();

// code has to be written in this order bcuz javascript goes in order so the models need to be seeded in order as they rely on e/o's foreign keys etc 


//what the spread operator does for each comment in the comment seed data array:
/*Comment.create({
    body: 'great post!',  //gets its properties and speads it into this new object (onlt body bcuz its the onlt non automatic one)
    post_id: 3,
})*/