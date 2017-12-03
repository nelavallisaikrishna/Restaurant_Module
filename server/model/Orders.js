/**
 * Created by saikrishna on 28/11/17.
 */

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
// Schema
var schema = new mongoose.Schema({
    orderId : {type: String},
    orderStatus: {type: String,enum : ['NEW','IN_PROGRESS','COMPLETED','CANCEL','PAID']},
    orderDetails : {
      from : {
          userId : {type: mongoose.Schema.Types.ObjectId},
          userName : {type: String}
      },
      to : {
          restaurantID : {type: mongoose.Schema.Types.ObjectId},
          restaurantName : {type: String},
          tableNo :  {type: String}
      }
    },
    items: [{
        item : {type: String},
        MRP : {type: String},
        quantity :  {type: Number},
        totalPricePerItem: {type: Number}
    }],
    paymentDetails: {
        grandTotal: {type: Number},
        mode: {type: String, require: true, enum: ['CASH','CARD']},
        receivedAmount: {type: Number},
        GST : {
            amount : {type: String},
            percent : {type: String}
         },
        discountAmount: {type: Number}
    }
});

//index
schema.index({orderId: 1,'orderDetails.to.restaurantID' : 1,'orderDetails.from.userId' : 1});

// Model
var model = mongoose.model('Orders', schema);

// Public API
module.exports = model;
