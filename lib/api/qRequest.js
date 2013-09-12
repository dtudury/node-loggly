/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 8/31/13
 * Time: 1:45 PM
 */

var http = require('http');
var https = require('https');
var Q = require('q');
var _ = require('lodash');

exports.request = request;
exports.get = get;
exports.post = post;

exports.verbose = false;

function request(options, body, secureProtocol, method) {
    var deferred = Q.defer();

    options = _.extend(options, {method: method});

    if (body) {
        if (!_.isString(body)) body = JSON.stringify(body);
        //sets content-length if it's unset
        options.headers = options.headers || {};
        options.headers = _.defaults(options.headers, {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': body.length
        });
    }

    var request;
    if (secureProtocol) {
        options = _.extend(options, {port: 443});
        request = https.request(options, dataConsumer);
    } else {
        options = _.extend(options, {port: 80});
        request = http.request(options, dataConsumer);
    }
    if (exports.verbose) {
        console.log('------------------------------------------ request');
        console.log('options:', options);
        console.log('body:', body);
        console.log('------------------------------------------ request');
    }
    if (body) {
        request.write(body);
    }
    request.end();

    return deferred.promise;

    function dataConsumer(response) {
        var data = "";
        response.setEncoding('utf8');
        response.on('data', function (buffer) {
            data += buffer;
        });
        response.on('end', function () {
            var result = _.pick(response, 'headers', 'statusCode');
            result.data = data;
            if (exports.verbose) {
                console.log('========================================== response');
                console.log(result);
                console.log('========================================== response');
            }
            deferred.resolve(result);
        });
        response.on('error', function (error) {
            deferred.reject(error);
        });
    }
}

function get(options, secureProtocol) {
    return request(options, null, secureProtocol, 'GET');
}

function post(options, body, secureProtocol) {
    return request(options, body, secureProtocol, 'POST');
}