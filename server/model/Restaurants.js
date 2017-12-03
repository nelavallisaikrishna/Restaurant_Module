/**
 * Created by saikrishna on 28/11/17.
 */

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
// Schema
var schema = new mongoose.Schema({
    name: {type: String},
    email : {type: String},
    address :{
        fullAddress : {type: String},
        city : {type: String},
        lat : {type: String},
        long : {type: String},
        pincode :  {type: String}
    },
    status : {type: String,enum : ['NEW','VERIFIED']},
    contactNumbers : {
        mobile : {type: String},
        landLine :  {type: String}
    },
    workingHours :{
        open : {type: String},
        close :{type: String}
    },
    images : [ {type: String}],
    menuDetails : [{
        dishName : {type: String},
        MRP : {type: String},
        description :  {type: String}
    }],
    ownerId : {type:  mongoose.Schema.Types.ObjectId},
    ownerName : {type: String},
    updatedAt : {type: Date},
    createdDate: {type: Date, require: true, default: Date.now}
});

//index
schema.index({name: 1,address : 1});

// Model
var model = mongoose.model('Restaurants', schema);

// Public API
module.exports = model;
