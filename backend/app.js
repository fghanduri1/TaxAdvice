//required packages are added and a path is assigned to a constant



const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ("mongoose");
const path = require('path');

const Post = require('./models/post');

const app = express();


//mongodb key goes here connecting to respective database
//output is produced based on connection to see if it works
mongoose.connect("ADD MONGODB KEY HERE")
 .then (() => {
    console.log('Connected to Database!')
 })
  .catch(() =>{
    console.log('Connection Failed!');
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-Width, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

//method for adding a new post successfully to the database 
app.post('/api/posts',(req, res, next) =>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });

});


//when a post is updated it would retive the initial posts Id and use that for the updated post 
app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    res.status(200).json({message: 'Update Sucessful!'});
  });
});

//when page is loaded post are fetched from the dB
app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    });
});


//method used when a post is found by id and would return respective messages
app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    }else {
      res.status(404).json({message: 'Post not found'});
    }
  });
});

//method used when post is deleted 
app.delete("/api/posts/:id", (req, res, next) =>{
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
  })
  res.status(200).json({message: 'Post has been deleted'});
});

app.use((req, res, next) =>{
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
