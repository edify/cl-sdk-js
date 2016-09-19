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

1.  Install dependencies
```bash
$ npm install
```

2.  In order to use the sdk, you have to set the following environment variables, these credentials will be used to sign the requests. If you need information about credential generation, go to cl-auth/bootstrap project .
```text
- CL_LO_API_ID
- CL_LO_API_SECRET
```

3.  First, you need to import the sdk client.
```javascript
const LearningObject = require('path/to/cl-sdk-js/cl-sdk-js-lo/lib/learning_object');
LearningObject.client.init('http://localhost:8080', '/api/v1');
```

4.  Use the client functions:

  - Find Learning Object by Id:
```javascript
let id = 'learningobjectdesiredid0';
LearningObject.client.findById(id).then(function(lo) {
    console.log(lo);
}).catch(function(err) {
    console.log(err);
});
```

  - Find Learning Object by Learning Objective name:
```javascript
let name = 'LO Name';
let from = 0;
let size = 1;
let all = true;
LearningObject.client.findByLearningObjective(name, from, size, all).then(function(los) {
    console.log(los);
}).catch(function(err) {
    console.log(err);
});
```

  - Find all Learning Objects:
```javascript
let from = 0;
let size = 1;
let all = true;
LearningObject.client.findAll(from, size, all).then(function(los) {
    console.log(los);
}).catch(function(err) {
    console.log(err);
});
```

  - Find Learning Objective by Id:
```javascript
let id = 'learningobjectivedesiredid'
LearningObject.client.findLearningObjectiveById(id).then(function(lo) {
    console.log(lo);
}).catch(function(err) {
    console.log(err);
});
```


## Testing

- To execute the integration tests, you need to run the Learning Object micro service with the following commands:

```bash
$ cd path/to/cl-api
$ ./gradlew build
$ java -Dspring.profiles.active=Integration_Tests,BE_Mongo,FS_S3,SRCH_ES -jar build/libs/*.jar
```

Note: When you use the profile 'Integration_Tests' the program will start a new empty mongo database instance with the required test data. Make sure the docker-compose command was executed.

- Run tests

```bash
$ cd path/to/cl-sdk-js/cl-sdk-js-lo
$ npm test
```

Note: Make sure you exported the required environment variables.
