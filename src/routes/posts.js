const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken')

const PostController = require('../controllers/postController');

router
    .get('/', verify, PostController.getPosts)
    .get('/:id', verify, PostController.getPost)
    .post('/', verify, PostController.savePost)
    .delete('/del/:id', verify, PostController.deletePost)
    .patch('/:id', verify, PostController.updatePost)

module.exports = router;