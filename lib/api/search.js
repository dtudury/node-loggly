/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 8/31/13
 * Time: 3:18 PM
 */

var url = require('url');
var qRequest = require('./qRequest');

exports.vo = function searchObject(q, from, until, order, size) {
    this.q = q || '*';
    if(from) this.from = from;
    if(until) this.until = until;
    if(order) this.order = order;
    if(size) this.size = size;
};

exports.get = function getSearch(account, username, password, searchObject, secureProtocol) {
    var options = {
        hostname: account,
        path: url.format({pathname:'/apiv2/search', query:searchObject}),
        auth: username + ':' + password
    };
    return qRequest.get(options, secureProtocol);
};
