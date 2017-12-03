/**
 * Created by saikrishna on 28/11/17.
 */

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
// Schema
var schema = new mongoose.Schema({
    restaurantId : {type: mongoose.Schema.Types.ObjectId},
    userId : {type: mongoose.Schema.Types.ObjectId},
    reviewText : {type: String},
    reviewerName : {type: String},
    reviewDate : {type: Date, default : Date.now},
    rating : {type: Number}
    /*ReviewReply : [{
        reviewReplierName : {type: String},
        replyText : {type: String},
        date : {type: Date, default : Date.now}
    }]*/
});

//index
schema.index({restaurantId: 1});

// Model
var model = mongoose.model('Reviews', schema);

// Public API
module.exports = model;
