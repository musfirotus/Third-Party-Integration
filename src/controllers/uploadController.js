const { authors, posts, comments } = require("../models");

const response = {
  status: false,
  message: "",
  data: [],
};

const attAuthor = ['username', 'email', 'profile'];
const attPost = ['title', 'content', 'tags', 'status'];
const attComment = ['content', 'status', 'email', 'url'];

class UploadController {
    static async uploadPhoto(req, res) {}
}

module.exports = UploadController;
