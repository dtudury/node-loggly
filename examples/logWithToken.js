/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 9/11/13
 * Time: 11:22 PM
 */

var cred = require('./credentials');
var Loggly = require('../lib/loggly');


function printResponse(response) {
    console.log(JSON.stringify(JSON.parse(response.data), null, 4));
    return response;
};

var index = 0;
function makeDummyData() {
    return new Loggly.inputsVO(JSON.stringify({t: +new Date(), rand: Math.random(), i: index++}), 'log-example', 'logWithToken', 'dummy', 'data'); // create dummy data with a few tags
}


var loggly = new Loggly(cred.token);

loggly.log(makeDummyData()).then(printResponse)               // log some dummy data
    .then(makeDummyData).then(loggly.log).then(printResponse) // then log some more...
    .then(makeDummyData).then(loggly.log).then(printResponse)
    .then(makeDummyData).then(loggly.log).then(printResponse)
    .then(makeDummyData).then(loggly.log).then(printResponse)
    .done();
