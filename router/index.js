module.exports = function (app) {
	app.use('/admin/api/admin', require('./routes/admin/api/admin'));
	app.use('/admin/api/blog_info', require('./routes/admin/api/blogInfo'));
  app.use('/admin/api/article', require('./routes/admin/api/article'));
  app.use('/admin/api/article_type', require('./routes/admin/api/articleType'));
  app.use('/admin/api/article_tag', require('./routes/admin/api/articleTag'));
  app.use('/admin/api/single_page', require('./routes/admin/api/singlePage'));
  app.use('/admin/api/upload', require('./routes/admin/api/upload'));
};
