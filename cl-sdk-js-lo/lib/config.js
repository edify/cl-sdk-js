/**
 * Created by diugalde on 05/09/16.
 */

const bluebird = require('bluebird');
const restify = require('restify');


const config = {
    credentials: {
        apiKeyId: process.env.CL_LO_API_ID,
        apiSecretKey: process.env.CL_LO_API_SECRET
    },
    security: {
        nonceLength: 15
    },
    testing: {
        baseURL: 'http://localhost:8080',
        apiURL: '/api/v1'
    }
};


bluebird.promisifyAll(restify.JsonClient.prototype);

module.exports = config;
