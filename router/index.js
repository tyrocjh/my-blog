module.exports = function (app) {
	app.use('/admin/blog_info', require('./routes/admin/blogInfo'));
  app.use('/admin/article', require('./routes/admin/article'));
  app.use('/admin/article_tag', require('./routes/admin/articleTag'));
  app.use('/admin/upload', require('./routes/admin/upload'));
};
