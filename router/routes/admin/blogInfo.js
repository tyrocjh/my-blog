var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.send('get blog info...');
});

router.post('/', function (req, res) {
	res.send('post blog info...');
});

module.exports = router;
