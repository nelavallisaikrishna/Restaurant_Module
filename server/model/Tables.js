/**
 * Created by saikrishna on 28/11/17.
 */

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
// Schema
var schema = new mongoose.Schema({
    restaurantId : {type: mongoose.Schema.Types.ObjectId},
    tableNo : {type: String},
    capacity : {type: Number},
    availability : {type: String,enum : ['FREE','OCCUPIED','RESERVED']},
    bookingDetails : {
        userId :  {type: mongoose.Schema.Types.ObjectId},
        userName :  {type: String},
        email :  {type: String},
        mobile : {type: String},
        bookingTime : {
          start : {type: Date},
          end : {type: Date}
        }
    }
});

//index
schema.index({restaurantId: 1,tableNo : 1,capacity : 1,availability : 1});

// Model
var model = mongoose.model('Tables', schema);

// Public API
module.exports = model;
