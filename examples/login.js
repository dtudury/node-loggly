/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 9/11/13
 * Time: 10:55 PM
 */

var cred = require('./credentials');
var Loggly = require('../lib/loggly');


var loggly = new Loggly(cred.account, cred.username, cred.password);

loggly.customer() // this logs me in and retrieves customer token
    .then(function (response) {
        console.log(JSON.parse(response.data));
    })
    .done();