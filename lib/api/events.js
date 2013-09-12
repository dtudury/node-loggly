/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 8/31/13
 * Time: 7:15 PM
 */

var url = require('url');
var qRequest = require('./qRequest');

exports.vo = function eventsObject(rsid, page) {
    this.rsid = rsid;
    if(page) this.page = page;
};

exports.get = function getEvents(account, username, password, eventsObject, secureProtocol) {
    var options = {
        hostname: account,
        path: url.format({pathname:'/apiv2/events', query:eventsObject}),
        auth: username + ':' + password
    };
    return qRequest.get(options, secureProtocol);
};
