/*
 * Copyright 2016 Edify Software Consulting.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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
