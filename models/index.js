const User = require('./User');
const post = require('./post');
const comment = require('./comment');

User.hasMany(post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

post.belongsTo(User, {
  foreignKey: 'user_id'
});

post.hasMany(comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

comment.belongsTo(post, {
  foreignKey: 'post_id'
});


module.exports = { User, post, comment };
