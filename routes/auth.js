var express = require('express');
var router = express.Router();

const { isAuthorized } = require('../controller/auth.js');

router.post('/', isAuthorized);

module.exports = router;
