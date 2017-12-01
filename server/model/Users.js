/**
 * Created by saikrishna on 28/11/17.
 */
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
// Schema
var schema = new mongoose.Schema({
    name: {type: String},
    username: {type: String},
    password: {type: String},
    email : {type: String},
    address :{
        fullAddress : {type: String},
        lat : {type: String},
        long : {type: String},
        pincode :  {type: String}
    },
    userType : {type: String,enum : ['CUSTOMER','BUSINESS']},
    status : {type: String,enum : ['ACTIVE','INACTIVE']},
    contactNumbers : {
        mobile : {type: String},
        landLine :  {type: String}
    },
    GCMToken : {type: String},
    updatedAt : {type: Date},
    createdDate: {type: Date, require: true, default: Date.now}
});

//index
schema.index({'username': 1});

// Model
var model = mongoose.model('Users', schema);

// Safe JSON (internal data removed)
function getSafeJSON(user) {
    console.log('Inside safe Json in user model');
    var user = user.toJSON();
    delete user.__v;
    if (user.password) {
        delete user.password;
    }
    return user;
};

// Public API
module.exports = model;
module.exports.getSafeJSON = getSafeJSON;
