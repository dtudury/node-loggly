/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 8/31/13
 * Time: 3:19 PM
 */

var url = require('url');
var qRequest = require('./qRequest');

exports.vo = function inputsObject(data) {
    this.data = data;
    if(arguments.length > 1)
        this.tags = [].slice.call(arguments, 1);
};

exports.post = function send(logHost, token, inputsObject, secureProtocol) {
    var tag = '';
    if(inputsObject.tags) tag = '/tag/' + inputsObject.tags.join(',') + '/';
    var options = {
        hostname: logHost,
        path: '/inputs/' + token + tag
    };
    return qRequest.post(options, inputsObject.data, secureProtocol);
};

exports.get = function send(logHost, token, inputsObject, secureProtocol) {
    var tag = '';
    if(inputsObject.tags) tag = '/tag/' + inputsObject.tags.join(',') + '/';
    var options = {
        hostname: logHost,
        path: url.format({pathname:'/inputs/' + token + tag, query:inputsObject.data})
    };
    return qRequest.get(options, secureProtocol);
};
