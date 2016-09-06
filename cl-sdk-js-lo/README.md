# cl-sdk-js-lo

CL Learning Object SDK

---

This guide gives the user working code examples about how to interact with the CL - Learning Object micro service.

This project needs to be placed in the same directory as cl-auth. In general, Common Library repositories should look like:

    /parent_directory
        /cl-core
        /cl-api
        /cl-auth
        /cl-sdk-js/cl-sdk-js-lo


## General usage

1. In order to use the sdk, you have to set the following environment variables, these credentials will be used to sign the requests. If you need information about credential generation, go to cl/bootstrap project .
```text
- CL_LO_API_ID
- CL_LO_API_SECRET
```

2.  First, you need to import the sdk client.

```javascript
const loClient = require('path/to/lo_client');
```


