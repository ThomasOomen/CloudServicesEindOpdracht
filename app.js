const express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');

require('./services/authentication/authentication');

const router = require("./services/routers/router");
const secureRoute = require('./services/routers/secureRoutes');
const adminRoute = require('./services/routers/secureAdminRoutes');

const { toXML } = require('jstoxml');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
let dbUri = 'mongodb://';

if (process.env.username && process.env.password) {
    dbUri += `${username}:${password}@`;
}
dbUri += `${process.env.hostName}:${process.env.dbPort}/${process.env.dbName}`

if (process.env.dbConnectionString) {
    dbUri = process.env.dbConnectionString
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express();

        //Create application level middleware to handle sending xml and json
        // based on accepting request types
        app.use(function (req, res, next) {
            res.sendData = function(obj){sendData(obj,req,res)};
            next();
        });

        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(express.json({ limit: '500mb' }));
        app.use("/services", router);
        app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
        app.use('/admin', passport.authenticate('adminOnly', { session: false }), adminRoute);

        app.listen(process.env.PORT, () => {
            console.log("server has started on port " + process.env.PORT);
        })
    })

function sendData(obj,req ,res) {
    if (req.accepts('json') || req.accepts('text/html')) {
        res.header('Content-Type', 'application/json');
        res.send(obj);
    } else
        if (req.accepts('application/xml')) {
            res.header('Content-Type', 'text/xml');
            const xmlOptions = {
                header: true,
                indent: '   '
            };
            let parsedResponse = { response: JSON.parse(obj) };
            var xml = toXML(parsedResponse, xmlOptions);
            res.send(xml);
        } else {
            res.send(406);
        }
};
