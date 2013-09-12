/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 8/31/13
 * Time: 1:40 PM
 */

var qRequest = require('./qRequest');

exports.get = function getCustomer(account, username, password, secureProtocol) {
    var options = {
        hostname: account,
        path: '/apiv2/customer',
        auth: username + ':' + password
    };
    return qRequest.get(options, secureProtocol);
};
