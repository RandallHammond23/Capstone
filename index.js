const connectDB = require("./start up/db");
const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./Routes/Users')
const auth = require('./Routes/auth')
const fs = require('fs')
const path = require('path')
const post = require('./Routes/Posts')
const followers = require('./Routes/followers')

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/users', users)
app.use('/api/addUser', users)
app.use('/api/remove', users)
app.use('/api/addPost', post)
app.use('/api/Follow', followers)
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use((error,req,res,next) =>{
if (req.file){
    fs.unlink(req.file.path, (err) => {
        console.log(err);
    });
}
if (res.headerSent){
    return next(error);
}
res.status(error.code || 500);
res.json({message: error.message || "An unknown error occurred!"});
});








const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});