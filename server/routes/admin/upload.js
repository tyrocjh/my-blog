var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({ dest: 'public/upload/images/'});
var type = upload.single('upload');

router.post('/', type, function (req, res) {
	funcNum = req.query['CKEditorFuncNum'];
	path = '/upload/images/' + req.file.filename;
	res.send('<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('+ funcNum +', "'+ path +'", "");</script>');
});

module.exports = router;
