/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 8/31/13
 * Time: 1:26 PM
 */

var _ = require('lodash');
var Q = require('q');
var customer = require('./api/customer');
var inputs = require('./api/inputs');
var search = require('./api/search');
var events = require('./api/events');

module.exports = function loggly(account_or_token, username, password) {
    var self = this;
    var eventsPage;

    //public members
    if (username && password) {
        self.account = account_or_token;
        self.username = username;
        self.password = password;
    } else {
        self.token = account_or_token;
    }
    self.rsid = null;
    self.secureProtocol = false;
    self.logHost = 'logs-01.loggly.com';

    //public methods
    self.customer = function () {
        return customer.get(self.account, self.username, self.password, self.secureProtocol)
            .then(_saveToken);
    };
    self.log = function (inputsObject) {
        return _check_token()
            .then(function () {
                return inputs.post(self.logHost, self.token, inputsObject, self.secureProtocol);
            });
    };
    self.search = function (searchObject) {
        eventsPage = -1;
        return search.get(self.account, self.username, self.password, searchObject, self.secureProtocol)
            .then(_saveRsid);
    };
    self.events = function (page) {
        eventsPage = isNaN(page) ? 0 : page;
        return events.get(self.account, self.username, self.password, new events.vo(self.rsid, eventsPage), self.secureProtocol);
    };
    self.nextEvents = function () {
        return self.events(++eventsPage);
    };
    self.prevEvents = function () {
        return self.events(--eventsPage);
    };

    //private methods
    function _check_token() {
        if (self.token) return Q();
        return self.customer();
    }
    function _saveToken(customerResponse) {
        self.token = JSON.parse(customerResponse.data).tokens[0];
        return customerResponse;
    }
    function _saveRsid(searchResponse) {
        self.rsid = JSON.parse(searchResponse.data).rsid.id;
        return searchResponse;
    }
};

//static value object constructors
module.exports.searchVO = search.vo;
module.exports.inputsVO = inputs.vo;