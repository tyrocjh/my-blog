module.exports = function (app) {
	app.use('/admin/api/login', require('./admin/login'));
	app.use('/admin/api/admin', require('./admin/admin'));
	app.use('/admin/api/blog_info', require('./admin/blogInfo'));
  app.use('/admin/api/article', require('./admin/article'));
  app.use('/admin/api/article_type', require('./admin/articleType'));
  app.use('/admin/api/article_tag', require('./admin/articleTag'));
  app.use('/admin/api/single_page', require('./admin/singlePage'));
  app.use('/admin/api/upload', require('./admin/upload'));
};
