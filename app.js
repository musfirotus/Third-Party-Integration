const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary').v2
const port = 3000

const routeIndex = require('./src/routes/index')
const routeAuthor = require('./src/routes/authors')
const routePost = require('./src/routes/posts')
const routeComment = require('./src/routes/comments')
const routeJwt = require('./src/routes/jwts')
const dotenv = require('dotenv')

dotenv.config();
cloudinary.config({
    cloud_name: 'musfirotus',
    api_key: '924452587884594',
    api_secret: '_4L0jhrObd8-5U_Atlcqqo-suMs'
});

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/', routeIndex)
app.use('/author', routeAuthor)
app.use('/post', routePost)
app.use('/comment', routeComment)
app.use('/jwt', routeJwt)

app.post('/upload', (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})