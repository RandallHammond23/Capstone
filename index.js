const connectDB = require("./start up/db");
const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./Routes/Users')


connectDB();

app.use(cors());
app.use(express.json());
// app.use('/api/users', users)


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});