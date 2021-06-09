const express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');

// require('./auth/auth');

// const router = require("./routers/router");
// const UIRouter = require("./routers/uiRouter")
// const secureRoute = require('./routers/secure-routes');
// const adminRoute = require('./routers/secure-routes-admin')

// const { toXML } = require('jstoxml');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
let dbUri = 'mongodb://';

if (process.env.username && process.env.password) {
  dbUri += `${username}:${password}@`;
}
dbUri += `${process.env.hostName}:${27017}/${process.env.dbName}`
console.log(dbUri);

if (process.env.dbConnectionString) {
  dbUri = process.env.dbConnectionString
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();

    console.log(dbUri)
    app.listen(process.env.PORT, () => {
      console.log("server has started on port " + process.env.PORT);
    })
  })