const { authors, posts, comments } = require("../models");

const response = {
  status: false,
  message: "",
  data: [],
};

const attAuthor = ['username', 'email', 'profile'];
const attPost = ['title', 'content', 'tags', 'status'];
const attComment = ['content', 'status', 'email', 'url'];

class AuthorController {

    static async getAuthors(req, res){
        try {
            const findauthors = await authors.findAll({
                attributes: attAuthor,
                include: [{
                    model: posts,
                    attributes: attPost,
                    include: [{
                        model: comments,
                        attributes: attComment
                    }] 
                }]
            });
            if (findauthors.length !== 0) {
                response.data = findauthors;
                response.status = true;
                response.message = "Data found!"
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data not found!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async saveAuthor(req, res) {
        const {
            body: {username, password, salt, email, profile}
        } = req;

        try {
            const saveAuthor = await authors.create({
                username, password, salt, email, profile
            });
            response.data = {
                Username: saveAuthor.username,
                Salt: saveAuthor.salt,
                email: saveAuthor.email,
                Profile: saveAuthor.profile
            };
            response.status = true;
            response.message = "Berhasil tambah data"
            res.status(201).json(response);
        } catch (error) {
            response.status = "fail!";
            response.data = '';
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getAuthor(req, res) {
        const { id } = req.params;
        const authordetail = await authors.findByPk(
            id, {
                attributes: attAuthor,
                include: [{
                    model: posts,
                    attributes: attPost,
                    include: [{
                        model: comments,
                        attributes: attComment
                    }] 
                }]
            }
        );
        try {
            if (authordetail) {
                response.status = true;
                response.data = authordetail;
                response.message = "Data ditemukan!";
                res.status(200).json(response);
            } else {
                response.status = false;
                response.data = '';
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (error) {
          response.message = error.message;
          response.status = false;
          response.data = '';
          res.status(404).json(response);
        }
    }
    
    static async updateAuthor(req, res) {
        const { id } = req.params;
        const { username, password, salt, email, profile } = req.body;
        const auth = await authors.update({ username, password, salt, email, profile },
        { where: { id: id } });

        try {
            if (auth) {
                response.status = true;
                response.message = `Data author berhasil diedit`;
                response.data = await authors.findByPk(
                    id, {
                        attributes: attAuthor,
                        include: [{
                            model: posts,
                            attributes: attPost,
                            include: [{
                                model: comments,
                                attributes: attComment
                            }] 
                        }]
                    }
                );
                res.status(200).json(response);
            } else {
                response.status = false;
                response.data = '';
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.status = false;
            response.data = '';
            response.message = "ID tidak ditemukan!";
            res.status(400).json(response);
        }
    }

    static async deleteAuthor(req, res) {
        const { id } = req.params;
        const delAuthor = await authors.destroy({ where: {
            id: id
        }});

        try {
            if (delAuthor) {
                response.status = true;
                response.data = `ID : ${id}`;
                response.message = `Data author berhasil dihapus`;
                res.status(200).json(response);
            } else {
                response.status = false;
                response.data = '';
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.status = false;
            response.data = '';
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = AuthorController;
