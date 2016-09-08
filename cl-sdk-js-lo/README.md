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

1. In order to use the sdk, you have to set the following environment variables, these credentials will be used to sign the requests. If you need information about credential generation, go to cl-auth/bootstrap project .
```text
- CL_LO_API_ID
- CL_LO_API_SECRET
```

2.  First, you need to import the sdk client.

```javascript
const LearningObject = require('path/to/cl-sdk-js/cl-sdk-js-lo/lib/learning_object');

LearningObject.client.init('http://localhost:8080', '/api/v1');

let id = 'learningobjectdesiredid0';
LearningObject.client.findById(id).then(function(lo) {
    console.log(lo);
}).catch(function(err) {
    console.log(err);
});
```


## Testing

1. To execute the integration tests, you need to run the Learning Object micro service with the following commands:

```bash
$ cd path/to/cl-api
$ ./gradlew build
$ java -Dspring.profiles.active=Integration_Tests,BE_Mongo,FS_S3,SRCH_ES -jar build/libs/*.jar
```

Note: When you use the profile 'Integration_Tests' the program will start a new empty mongo database instance with the required test data. Make sure the docker-compose command was executed.
