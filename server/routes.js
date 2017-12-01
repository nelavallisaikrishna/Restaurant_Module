/**
 * Created by saikrishna on 28/11/17.
 */
var requireDir = require('require-dir');
var controllers = requireDir('./controller/api');

module.exports.register = function( router ) {
    // router.route( '/writeReview' ).post(controllers.reviewsAPI.writeReview );

    router.route('/register').post(controllers.user.createUser);
    router.route('/login').post(controllers.userAPI.loginUser);
    //
    // router.route('/entityRestaurantsAction').post(controllers.restaurantsAPI.entityRestaurantsAction);
    // router.route('/searchRestaurants').post(controllers.restaurantsAPI.searchRestaurants);
    // router.route('/menuAction').post(controllers.restaurantsAPI.menuAction);
    //
    // router.route('/tableActions').post(controllers.tablesAPI.tableActions);
    // router.route('/bookingTable').post(controllers.tablesAPI.bookingTable);
    // router.route('/searchTable').post(controllers.tablesAPI.searchTable);
    // router.route('/bookingDetails').post(controllers.tablesAPI.bookingDetails);

    // router.route('/ordersAction').post(controllers.ordersAPI.ordersAction);
};