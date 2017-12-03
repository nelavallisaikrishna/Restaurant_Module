/**
 * Created by saikrishna on 28/11/17.
 */
var requireDir = require('require-dir');
var controllers = requireDir('./controller/api');

module.exports.register = function( router ) {


    router.route('/register').post(controllers.user.createUser);
    router.route('/login').post(controllers.user.loginUser);
    router.route('/restaurantCreation').post(controllers.restaurants.restaurantCreation);

    router.route( '/writeReview' ).post(controllers.reviews.writeReview );
    router.route('/searchRestaurants').post(controllers.restaurants.searchRestaurants);
    router.route('/menuAction').post(controllers.restaurants.menuAction);

    router.route('/tableAssign').post(controllers.tables.tableAssign);
    router.route('/tableBooking').post(controllers.tables.tableBooking);
    router.route('/searchTable').post(controllers.tables.searchTable);
    router.route('/bookingDetails').post(controllers.tables.bookingDetails);

    router.route('/order').post(controllers.orders.order);
};