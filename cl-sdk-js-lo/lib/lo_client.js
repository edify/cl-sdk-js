/**
 * Created by diugalde on 22/08/2016.
 */

const restify = require('restify');

const config = require('./config');
const sauthc1Signer = require('../../../cl-auth/cl-auth-js/lib/sauthc1');
const utils = require('./utils');


/**
 * Generates an object with the required headers for sauthc1-authentication
 *
 * @param url - string.
 * @param method - string.
 * @param body - string.
 * @returns object
 * @private
 */
function _generateAuthHeaders(url, method, body) {
    let headers = {};
    let date = new Date();
    let nonce = utils.generateRandomString(config.security.nonceLength);
    sauthc1Signer.sign(headers, method, url, body, date, config.credentials, nonce);
    return headers;
}


module.exports = {

};
