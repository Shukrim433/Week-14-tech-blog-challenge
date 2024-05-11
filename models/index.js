const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//one to many
//one user has many posts
//many post belong to one user
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//one to many
//one post has many comments
//many comments belong to one post
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };





