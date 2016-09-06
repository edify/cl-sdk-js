/**
 * Created by diugalde on 05/09/16.
 */

const config = {
    credentials: {
        apiKeyId: process.env.CL_LO_API_ID,
        apiSecretKey: process.env.CL_LO_API_SECRET
    },
    security: {
        nonceLength: 15
    }
};

module.exports = config;
