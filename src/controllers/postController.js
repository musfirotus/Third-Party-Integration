const { posts, comments, authors } = require("../models");

const response = {
  status: false,
  message: "",
  data: [],
};
const attAuthor = ['username', 'email', 'profile'];
const attPost = ['title', 'content', 'tags', 'status'];
const attComment = ['content', 'status', 'email', 'url'];

class PostController {

    static async getPosts(req, res){
        try {
            const findposts = await posts.findAll({
                attributes: attPost,
                include: [{
                    model: authors,
                    attributes: attAuthor,
                    include: [{
                        model: comments,
                        attributes: attComment,
                    }]
                }]
            });
            if (findposts.length !== 0) {
                response.data = findposts;
                response.status = true;
                response.message = "Data ditemukan!"
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data tidal ditemukan!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async getPost(req, res) {
        const { id } = req.params;
        const postdetail = await posts.findByPk(
            id, {
                attributes: attPost,
                include: [{
                    model: authors,
                    attributes: attAuthor,
                    include: [{
                        model: comments,
                        attributes: attComment
                    }] 
                }]
            }
        );
        try {
            if (postdetail) {
                response.status = true;
                response.data = postdetail;
                response.message = "Data ditemukan!";
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (error) {
            response.data = '';
            response.status = false;
            response.message = error.message;
            res.status(404).json(response);
        }
    }

    static async savePost(req, res) {
        const {
            body: { title, content, tags, status, authorId }
        } = req;

        try {
            const savePost = await posts.create({
                title, content, tags, status, authorId
            });
            response.status = true;
            response.message = "Berhasil tambah data"
            response.data = {
                Title: savePost.title,
                Content: savePost.content,
                Tags: savePost.tags,
                Status: savePost.status
            };
            res.status(201).json(response);
        } catch (error) {
            response.data = '';
            response.status = false;
            response.message = "ID author tidak ditemukan!";
            res.status(400).json(response);
        }
    }
    
    static async updatePost(req, res) {
        const { id } = req.params;
        const { title, content, tags, status, authorId } = req.body;
        const pos = await posts.update({ title, content, tags, status, authorId },
        { where: { id: id } });

        try {
            if (pos) {
                response.status = true
                response.message = `Data post berhasil diubah`;
                response.data = await posts.findByPk(
                    id, {
                        attributes: attPost,
                        include: [{
                            model: authors,
                            attributes: attAuthor,
                            include: [{
                                model: comments,
                                attributes: attComment
                            }] 
                        }]
                });
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal diperbarui!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deletePost(req, res) {
        const { id } = req.params;
        const delPost = await posts.destroy({ where: {
            id: id
        }});

        try {
            if (delPost) {
                response.status = true;
                response.data = `ID : ${id}`
                response.message = `Data post berhasil dihapus`;
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal dihapus!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = PostController;
