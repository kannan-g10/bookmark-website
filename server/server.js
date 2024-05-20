const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch(err => {
    console.log(err);
  });

const bookMarkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    url: {
      type: String,
      required: [true, 'Url is required'],
    },
  },
  { timestamps: true }
);

const bookMarkModel = mongoose.model('bookmarks', bookMarkSchema);

app.post('/bookmarkData', (req, res) => {
  let bookmark = req.body;
  bookMarkModel
    .create(bookmark)
    .then(document => {
      res.send({ data: document, message: 'Bookmark Created' });
    })
    .catch(err => {
      console.log(err);
      res.send({ message: 'Some Problem' });
    });
});

app.get('/bookmarkData', (req, res) => {
  bookMarkModel
    .find()
    .then(response => res.send(response))
    .catch(err => {
      console.log(err);
      res.send('Can not get all bookmark');
    });
});

app.get('/bookmarkData/:id', (req, res) => {
  bookMarkModel
    .findOne({ _id: req.params.id })
    .then(response => res.send({ data: response, message: 'success' }))
    .catch(err => {
      console.log(err);
      res.send('Can not get all bookmark');
    });
});

app.put('/bookmarkData/:id', (req, res) => {
  bookMarkModel
    .updateOne({ _id: req.params.id }, req.body)
    .then(response => res.send({ data: response, message: 'success' }))
    .catch(err => {
      console.log(err);
      res.send('Can not update data');
    });
});

app.delete('/bookmarkData/:id', (req, res) => {
  bookMarkModel
    .deleteOne({ _id: req.params.id })
    .then(() => res.send({ message: 'data deleted' }))
    .catch(err => {
      console.log(err);
      res.send({ message: 'cannot delete the data' });
    });
});

app.listen(3000, () => {
  console.log('Server Running', port);
});
