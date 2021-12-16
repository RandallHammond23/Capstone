import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const express = require('express');
const connectDB = require("./startup/db");

const app = express();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


