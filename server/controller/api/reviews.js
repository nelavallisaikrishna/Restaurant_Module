/**
 * Created by saikrishna on 28/11/17.
 */



var Reviews = require('../../model/Reviews');

function writeReview(req,res){
    var newReview = new Reviews(req.body);
    newReview.save(function (err, result) {
        if(result !== null) {
            res.json({result : result,status : true});
        }else{
            res.json({result : result,status : true});
        }
    });
}


module.exports.writeReview = writeReview;