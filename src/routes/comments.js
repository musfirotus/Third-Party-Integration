const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken')

const CommentController = require('../controllers/commentController');

router
    .get('/', verify, CommentController.getComments)
    .get('/:id', verify, CommentController.getComment)
    .post('/', verify, CommentController.saveComment)
    .delete('/del/:id', verify, CommentController.deleteComment)
    .patch('/:id', verify, CommentController.updateComment)

module.exports = router;