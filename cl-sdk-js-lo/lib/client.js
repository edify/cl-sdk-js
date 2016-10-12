/**
 * Created by diugalde on 22/08/2016.
 */

const restify = require('restify');

const config = require('./config');
const sauthc1Signer = require('../../../cl-auth/cl-auth-js/lib/sauthc1');
const utils = require('./utils');


var Client = {

    /**
     * Initializes json client and set the baseURL and apiURL.
     *
     * @param baseURL - string (Example: http://localhost:8080)
     * @param apiURL - string (Example: /api/v1)
     */
    init(baseURL, apiURL) {
        this.baseURL = baseURL;
        this.apiURL = apiURL;
        this.restClient = restify.createJsonClient({
            url: baseURL
        });
    },

    /**
     * Find learning object by id.
     *
     * @param id - string (Learning Object's id).
     * @returns promise
     */
    findById(id) {
        let path = `/learningObjects/${id}`;
        return this.get(path)
    },

    /**
     * Find all learning objects depending on parameters.
     *
     * @param from - number (Initial index).
     * @param size - number (How many learning objects from the initial index).
     * @param all - boolean (If this is set to true, all learning objects will be retrieved).
     * @returns promise
     */
    findAll(from, size, all) {
        let path = `/learningObjects?all=${all}&from=${from}&size=${size}`;
        return this.get(path)
    },

    /**
     * Retrieve all learning object related to a learning objective with the given name.
     *
     * @param name - string (Learning objective's name).
     * @param from - number (Initial index).
     * @param size - number (How many learning objects from the initial index).
     * @param all - boolean (If this is set to true, all learning objects will be retrieved).
     * @returns promise
     */
    findByLearningObjective(name, from, size, all) {
        let path = `/linkedlearningobjects?all=${all}&from=${from}&size=${size}&name=${name}`;
        return this.get(path)
    },

    /**
     * Find Learning Objective by id.
     *
     * @param id - string (Learning objective's id).
     * @returns promise
     */
    findLearningObjectiveById(id) {
        let path = `/learningObjectives/${id}`;
        return this.get(path)
    },

    /**
     * Make an async get request to the specified path.
     *
     * @param path - string (Example: /learningObjects/2sfhew5623).
     * @param apiURL - string (Optional, Example: /api/v1).
     * @returns promise
     */
    get(path, apiURL=this.apiURL) {
        let apiPath = `${apiURL}${path}`;
        let url = `${this.baseURL}${apiPath}`;

        let body = '';
        let method = 'get';

        let headers = _generateAuthHeaders(url, method, body);

        let options = {path: encodeURI(apiPath), headers: headers};

        return this.restClient.getAsync(options).then(function(req) {
            let res = req.res;

            if (res.statusCode !== 200) {
                return Promise.reject(_handleError('An error has occurred during the get request.', res.statusCode))
            } else {
                return Promise.resolve(JSON.parse(res.body))
            }
        }).catch(function(err) {
            return Promise.reject(_handleError(err.cause, err.statusCode))
        });
    },

    /**
     * Make an async post request to the specified path.
     *
     * @param path - string (Example: /learningObjects).
     * @param body - object (Object that will be send as the request data).
     * @param apiURL - string (Optional, Example: /api/v1).
     * @returns promise
     */
    post(path, body, apiURL=this.apiURL) {
        let apiPath = `${apiURL}${path}`;
        let url = `${this.baseURL}${apiPath}`;

        let jsonBody = JSON.stringify(body);
        let method = 'post';

        let headers = _generateAuthHeaders(url, method, jsonBody);

        let options = {path: encodeURI(apiPath), headers: headers};

        return this.restClient.postAsync(options, body).then(function(req) {
            let res = req.res;
            if (res.statusCode !== 200) {
                return Promise.reject(_handleError('An error has occurred during the post request.', res.statusCode))
            } else {
                return Promise.resolve(JSON.parse(res.body))
            }
        }).catch(function(err) {
            return Promise.reject(_handleError(err.cause, err.statusCode))
        });
    },

    /**
     * Make an async delete request to the specified path.
     *
     * @param path - string (Example: /learningObjects/2sfhew5623).
     * @param apiURL - string (Optional, Example: /api/v1).
     * @returns promise
     */
    delete(path, apiURL=this.apiURL) {
        let apiPath = `${apiURL}${path}`;
        let url = `${this.baseURL}${apiPath}`;

        let body = '';
        let method = 'delete';

        let headers = _generateAuthHeaders(url, method, body);

        let options = {path: encodeURI(apiPath), headers: headers};

        return this.restClient.delAsync(options).then(function(req) {
            let res = req.res;
            if (res.statusCode !== 200) {
                return Promise.reject(_handleError('An error has occurred during the delete request.', res.statusCode))
            } else {
                return Promise.resolve(JSON.parse(res.body))
            }
        }).catch(function(err) {
            return Promise.reject(_handleError(err.cause, err.statusCode))
        });
    },

    /**
     * Make an async put request to the specified path.
     *
     * @param path - string (Example: /learningObjects/2sfhew5623).
     * @param body - object (Object that will be send as the request data).
     * @param apiURL - string (Optional, Example: /api/v1).
     * @returns promise
     */
    put(path, body, apiURL=this.apiURL) {
        let apiPath = `${apiURL}${path}`;
        let url = `${this.baseURL}${apiPath}`;

        let jsonBody = JSON.stringify(body);
        let method = 'put';

        let headers = _generateAuthHeaders(url, method, jsonBody);

        let options = {path: encodeURI(apiPath), headers: headers, body: body};

        return this.restClient.putAsync(options, body).then(function(req) {
            let res = req.res;
            if (res.statusCode !== 200) {
                return Promise.reject(_handleError('An error has occurred during the put request.', res.statusCode))
            } else {
                return Promise.resolve(JSON.parse(res.body))
            }
        }).catch(function(err) {
            return Promise.reject(_handleError(err.cause, err.statusCode))
        });
    }
};


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

/**
 * Generates a default error object for every client error response.
 *
 * @param err - object (Description of what happened).
 * @param statusCode - number (Response status code).
 * @returns object
 * @private
 */
function _handleError(cause, statusCode) {
    return {
        statusCode: statusCode,
        body: cause
    }
}


module.exports = Object.create(Client);
