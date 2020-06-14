require('dotenv').config();


const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')

const app = Express()
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })

app.get('/', (req, res) => {

    // res.sendFile(path.join(`${__dirname}/uploads/photo_1592127650721_11.jpg`));
    return res.send('Done')

})
app.get('/api/get/', (req, res) => {
  return res.sendFile(path.join(`${__dirname}/uploads/photo_1592128185746_6046689.jpg`));

})

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  let picture =[]
  req.files.forEach(file => {
    picture.push(`${__dirname}/uploads/${file.filename}`)
  });
  res.status(200).json({
    message: 'success!',
    picture
  })
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})