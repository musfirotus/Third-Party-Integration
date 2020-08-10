const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const routeIndex = require('./src/routes/index')
const routeAuthor = require('./src/routes/authors')
const routePost = require('./src/routes/posts')
const routeComment = require('./src/routes/comments')
const routeJwt = require('./src/routes/jwts')
const dotenv = require('dotenv')

dotenv.config();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())

app.use('/', routeIndex)
app.use('/author', routeAuthor)
app.use('/post', routePost)
app.use('/comment', routeComment)
app.use('/jwt', routeJwt)

// Start of cloudinary
    const fileUpload = require('express-fileupload')
    const cloudinary = require('cloudinary').v2
    const verify = require('./src/middleware/verifyToken')
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    app.use(fileUpload({
        useTempFiles: true
    }))

    app.post('/upload', verify, (req, res) => {
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            res.send({
                success: true,
                result: {
                    "image" : result.public_id,
                    "url" : result.url
                }
            })
        })
    })
// End of cloudinary

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})