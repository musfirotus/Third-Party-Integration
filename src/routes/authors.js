const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken')

const AuthorController = require('../controllers/authorController');

router
    .get('/', verify, AuthorController.getAuthors)
    .get('/:id', verify, AuthorController.getAuthor)
    .post('/', verify, AuthorController.saveAuthor)
    .delete('/del/:id', verify, AuthorController.deleteAuthor)
    .patch('/:id', verify, AuthorController.updateAuthor)

module.exports = router;