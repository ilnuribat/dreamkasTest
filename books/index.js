var express = require('express');
var router = express.Router();

router.get('/', require('./getBooks'));
router.get('/:id', require('./getOneBook'));

//auth check is need only for post, put and delete methods
router.use(require('./../auth/checkAuth'));

router.post('/', require('./createBook'));
router.put('/:id', require('./updateBook'));
router.delete('/:id', require('./deleteBook'));

module.exports = router;