module.exports = {
  database: process.env.MONGO_URI || 'mongodb://localhost/my-blog-demo',
  jwtSecret: 'my blog secret.'
};
