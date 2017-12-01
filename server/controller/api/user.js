/**
 * Created by saikrishna on 28/11/17.
 */


var Users = require('../../model/Users');
var bcrypt = require('bcryptjs');
var _ = require('lodash');

function createUserAPI(req,res){
    var createUser = new Users(req.body);
    getUserByUsername(req,function(userExistsRes){
        if(userExistsRes.result == false) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(createUser.password, salt, function(err, hash) {
                    createUser.password = hash;
                    createUser.userType = "CUSTOMER";
                    createUser.status = "ACTIVE";
                    createUser.save(function (err, result) {
                        res.json({result : result,status : true});
                    });
                });
            });
        }else{
            userExistsRes.status =false;
            res.json(userExistsRes);
        }
    });
}


function getUserByUsername(req,res){
    var loginDetail = {
        'username' :req.body.username
    };
    Users.findOne(loginDetail,function(req,results){
        if(results !== null) {
            res({result :'User Already exists',status : true});
        }else{
            res({result :false,status : false});
        }
    })
}
function _comparePassword(requestPassword,user,cb) {
    bcrypt.compare(requestPassword, user.password, cb);
}


function loginUserPOST(req,res){
    var loginDetail = {
        'username' :req.body.username
    };
    var errMsgs = [],
        focus = null;

    function _sendError(err) {
        if (!errMsgs.length) {
            errMsgs.push(err.message);
        }
        cb(err, {
            focus: focus,
            form: _.omit(req.body, 'password'),
            messages: errMsgs
        });
    }

    // Validation.
    if (_.isEmpty(req.body.username)) {
        errMsgs.push('<strong>Username</strong> is required.');
        focus = focus || 'username';
    } else if (/ /.test(req.body.username)) {
        errMsgs.push('<strong>Username</strong> cannot have a space.');
        focus = focus || 'username';
    }

    if (_.isEmpty(req.body.password)) {
        errMsgs.push('<strong>Password</strong> is required.');
        focus = focus || 'password';
    } else if (/ /.test(req.body.password)) {
        errMsgs.push('<strong>Password</strong> cannot have a space.');
        focus = focus || 'password';
    }

    // Return error.
    if (errMsgs.length) {
        return _sendError(new Error(S(errMsgs[0] || '').stripTags().s));
    }

    // Transform data.
    req.body.username = (req.body.username || '').toLowerCase();

    // Authentication.
    Users.findOne(loginDetail,function(errUser,results){
        if(results !== null) {
            _comparePassword(req.body.password,results,function (err,comparedRes){
                if(comparedRes){
                    var userData = Users.getSafeJSON(results);
                    res.json({result : userData ,status : true});
                }else{
                    res.json({result : 'Password Wrong',status : false});
                }
            });
        }else{
            res.json({result : 'User not found',status : false});
        }
    });
}

module.exports.createUser = createUserAPI;
module.exports.loginUser = loginUserPOST;
