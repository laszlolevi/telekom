const express = require('express');
const router = express.Router();

router.use('/test', require('./test-route'));

module.exports = router;