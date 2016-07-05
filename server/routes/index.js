module.exports = function (app, config) {
	app.use('/admin/api', require('../middlewares/auth-check')(config));
	app.use('/admin/login', require('./admin/login'));
	app.use('/admin/api/admin', require('./admin/admin'));
	app.use('/admin/api/blog_info', require('./admin/blogInfo'));
  app.use('/admin/api/article', require('./admin/article'));
  app.use('/admin/api/article_type', require('./admin/articleType'));
  app.use('/admin/api/article_tag', require('./admin/articleTag'));
  app.use('/admin/api/single_page', require('./admin/singlePage'));
  app.use('/admin/api/link', require('./admin/link'));
  app.use('/admin/api/upload', require('./admin/upload'));

  app.use('/api/article', require('./sidebar')(), require('./article'));
};
