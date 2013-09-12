/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 9/11/13
 * Time: 11:29 PM
 */

var cred = require('./credentials');
var Loggly = require('../lib/loggly');


function printResponse(response) {
    console.log(JSON.stringify(JSON.parse(response.data), null, 4));
    return response;
};


var loggly = new Loggly(cred.account, cred.username, cred.password);

loggly.search(new Loggly.searchVO('tag:log-example', '-2h', 'now', 'desc', 3)).then(printResponse) //begin search
    .thenResolve(0).then(loggly.events).then(printResponse) // grab page 0
    .thenResolve(1).then(loggly.events).then(printResponse) // grab page 1
    .then(loggly.nextEvents).then(printResponse) // next page
    .then(loggly.prevEvents).then(printResponse) // previous page
    .done();