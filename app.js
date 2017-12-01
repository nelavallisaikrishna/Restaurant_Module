/**
 * Created by saikrishna on 28/11/17.
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    requireDir = require('require-dir'),
    config = require('./config/development.json'),
    passport = require('passport'),
    localStrategy = require('passport-local'),Strategy,
    path = require('path');
var controllers = requireDir('./server/controller/api');
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


//passport init
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname,'client')));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-username,x-token');
    next();
};
app.use(allowCrossDomain);

var router = express.Router();
var routes = require('./server/routes');

router.get('/', function(req, resp) {
    res.sendfile(__dirname+'/client/index.html');
});

routes.register(router);
app.use('/api', router);

mongoose.connect('mongodb://'+config.db.mongo.host+':'+config.db.mongo.port+'/'+config.db.mongo.db);
app.listen(7000, function () {
    console.log("Welcome to Restaurant server started at port : 7000")
})
module.exports = app;

