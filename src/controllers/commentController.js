const { comments, posts, authors } = require("../models");

const response = {
  status: false,
  message: "",
  data: [],
};
const attAuthor = ['username', 'email', 'profile'];
const attPost = ['title', 'content', 'tags', 'status'];
const attComment = ['content', 'status', 'email', 'url']

class CommentController {

    static async getComments(req, res){
        try {
            const findcomments = await comments.findAll({
                attributes: attComment,
                include: [{
                    model: posts,
                    attributes: attPost,
                    include: [{
                        model: authors,
                        attributes: attAuthor
                    }] 
                }]
            });
            if (findcomments.length !== 0) {
                response.status = true;
                response.data = findcomments;
                response.message = "Data ditemukan!";
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async saveComment(req, res) {
        const {
            body: {content, status, authorId, email, url, postId }
        } = req;

        try {
            const saveComment = await comments.create({
                content, status, authorId, email, url, postId
            });
            response.status = true;
            response.message = "Berhasil simpan data";
            response.data = {
                Content: saveComment.content,
                Status: saveComment.status,
                Email: saveComment.email,
                URL: saveComment.url,
            };
            res.status(201).json(response);
        } catch {
            response.data = '';
            response.status = false;
            response.message = "ID author / ID post tidak ada!";
            res.status(400).json(response);
        }
    }

    static async getComment(req, res) {
        const { id } = req.params;
        const commentdetail = await comments.findByPk(
            id, {
                attributes: attComment,
                include: [{
                    model: posts,
                    attributes: attPost,
                    include: [{
                        model: authors,
                        attributes: attAuthor
                    }] 
                }]
            }
        );
        try {
            if (commentdetail) {
                response.status = true;
                response.data = commentdetail;
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
    
    static async updateComment(req, res) {
        const { id } = req.params;
        const { content, status, authorId, email, url, postId } = req.body;
        const auth = await comments.update({ content, status, authorId, email, url, postId },
        { where: { id: id } });

        try {
            if (auth) {
                response.data = true;
                response.message = `Data berhasil diubah`;
                response.data = await comments.findByPk(
                    id, {
                        attributes: attComment,
                        include: [{
                            model: posts,
                            attributes: attPost,
                            include: [{
                                model: authors,
                                attributes: attAuthor
                            }] 
                        }]
                    });
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal diubah!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deleteComment(req, res) {
        const { id } = req.params;
        const delComment = await comments.destroy({ where: {
            id: id
        }});

        try {
            if (delComment) {
                response.status = true;
                response.message = `Data berhasil dihapus`;
                response.data = `ID : ${id}`
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

module.exports = CommentController;
