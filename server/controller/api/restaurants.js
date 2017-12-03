/**
 * Created by saikrishna on 28/11/17.
 */

var Restaurants = require('../../model/Restaurants');
var _ = require('lodash');

function restaurantCreation(req,res){
    console.log('req',req.body);
    if(req.body.action == 'NEW'){
        var newRest = new Restaurants(req.body.data);
        newRest.save(function (err, result) {
            if(result !== null) {
                res.json({result : result,status : true});
            }else{
                res.json({result : result,status : true});
            }
        });
    }else if(req.body.action == 'UPDATE'){
        var query = req.body.query;
        var updateDetails = req.body.updateDetails;
        Restaurants.update(query,updateDetails,function(err,results){
            if(results !== null) {
                res({result : results,status : true});
            }else{
                res({result :false,status : false});
            }
        })
    }else if(req.body.action == 'DELETE'){
        var query = req.body.query;
        Restaurants.delete(query,function(err,results){
            if(results !== null) {
                res({result : results,status : true});
            }else{
                res({result :false,status : false});
            }
        });
    }
}



function  searchRestaurants(req,res) {
    var query = {
        name :   new RegExp(req.body.name, 'i')
    };
    if(req.body.location){
        query['address.city'] =  new RegExp(req.body.location, 'i');
    }
    if(req.body.menuName){
        query['menuDetails.dishName'] =  new RegExp(req.body.menuName, 'i');
    }

    Restaurants.find(query,function(err,results){
            if(results !== null) {
                res.json({result : results,status : true});
            }else{
                res.json({result : results,status : true});
            }
    })
}


function menuAction(req,res){
    var result = {
        status : false
    };
    if(!req.body.restaurantID){
        res.json(result);
    }
    var query = {
        _id : req.body.restaurantID
    };

        Restaurants.findOne(query,function(err,results){
            if(results){
                if(req.body.action == 'ADD') {
                    var newMenu = {
                        dishName: req.body.dishName,
                        MRP: req.body.MRP,
                        description: req.body.description
                    };
                    if(results.menuDetails == null) {
                        results.menuDetails = [];
                    }
                    results.menuDetails.push(newMenu);

                }else if(req.body.action == 'DELETE'){
                    var index = _.findIndex(results.menuDetails, {dishName: req.body.dishName});
                    if (index > -1) {
                        results.menuDetails.splice(index, 1);
                    }
                }
                results.save();
                result.response = results;
                result.status = true;
                res.json(result);
            }else{
                res.json(result);
            }

        });
}

module.exports.restaurantCreation = restaurantCreation;
module.exports.searchRestaurants = searchRestaurants;
module.exports.menuAction = menuAction;