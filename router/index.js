module.exports = function (app) {
  app.use('/admin/blog_info', require('./routes/admin/blogInfo'));
};
