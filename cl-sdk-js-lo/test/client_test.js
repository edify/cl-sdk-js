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
 * Created by diugalde on 22/08/2016.
 */

const should = require('should');

const config = require('../lib/config');
const LearningObject = require('../lib/learning_object');


// Initialize global test data.
var testData = _initTestData();

// Before running any test, the client must be initialized.
before(function() {
    LearningObject.client.init(config.testing.baseURL, config.testing.apiURL)
});


describe('Find operations', function() {

    describe('Learning Objective By Id', function() {
        it('Retrieves the learning objective successfully when the id exists', function(done) {
            let id = 'integrationtestsloi00001';
            let expLO = testData.learningObjectives[0];
            LearningObject.client.findLearningObjectiveById(id).then(function(lo) {
                lo.should.have.property('id', expLO.id);
                lo.should.have.property('name', expLO.name);
                lo.should.have.property('description', expLO.description);
                done();
            }).catch(function(err) {
                done(err)
            });
        });

        it('Throws 404 error when the id does not exist', function(done) {
            let id = 'nonexistingloiid00000000';
            LearningObject.client.findLearningObjectiveById(id).catch(function(err) {
                err.statusCode.should.equal(404);
                done()
            });
        });
    });

    describe('Learning Object By Id', function() {
        it('Retrieves the learning object successfully when the id exists', function(done) {
            let id = 'integrationtestslo000001';
            let expLO = testData.learningObjects[0];
            LearningObject.client.findById(id).then(function(lo) {
                lo.should.have.property('id', expLO.id);
                lo.should.have.property('name', expLO.name);
                lo.should.have.property('description', expLO.description);
                done();
            }).catch(function(err) {
                done(err)
            });
        });

        it('Throws 404 error when the id does not exist', function(done) {
            let id = 'nonexistingloid000000000';
            LearningObject.client.findById(id).catch(function(err) {
                err.statusCode.should.equal(404);
                done()
            });
        });
    });

    describe('All Learning Objects', function() {
        it('Retrieves all the learning objects when the all parameter is true', function(done) {
            let from = 0;
            let size = 1;
            let all = true;
            LearningObject.client.findAll(from, size, all).then(function(los) {
                los.content.length.should.equal(2);
                los.content[0].should.have.property('id', testData.learningObjects[0].id);
                los.content[1].should.have.property('id', testData.learningObjects[1].id);
                done();
            }).catch(function(err) {
                done(err);
            });
        });

        it('Retrieves the correct range of learning objects when the all is false', function(done) {
            let from = 0;
            let size = 1;
            let all = false;
            //Should return just the first learning object.
            LearningObject.client.findAll(from, size, all).then(function(los) {
                los.content.length.should.equal(1);
                los.content[0].should.have.property('id', testData.learningObjects[0].id);
                done();
            }).catch(function(err) {
                done(err);
            });
        });
    });

    describe('Learning Object by Learning Objective name', function() {
        it('Retrieves all the learning objects when the name exists', function(done) {
            let name = 'Learning Objective 1 - Integration Test';
            let from = 0;
            let size = 1;
            let all = true;
            LearningObject.client.findByLearningObjective(name, from, size, all).then(function(los) {
                los.length.should.equal(1);
                los[0].should.have.property('id', testData.learningObjects[1].id);
                done();
            }).catch(function(err) {
                done(err);
            });
        });

        it('Throws 404 when there is no learning objective with the given name', function(done) {
            let name = 'Non existing name';
            let from = 0;
            let size = 1;
            let all = true;
            LearningObject.client.findByLearningObjective(name, from, size, all).catch(function(err) {
                err.statusCode.should.equal(404);
                done();
            });
        });

    });



});

function _initTestData() {
    let testData = {};
    testData.learningObjectives = [
        {
            id: 'integrationtestsloi00001',
            name: 'Learning Objective 1 - Integration Test',
            description: 'Learning Objective 1 - Integration Test Description',
            learningObjectiveList: []
        },
        {
            id: 'integrationtestsloi00002',
            name: 'Learning Objective 2 - Integration Test',
            description: 'Learning Objective 2 - Integration Test Description',
            learningObjectiveList: []
        }
    ];
    testData.learningObjects = [
        {
            id: 'integrationtestslo000001',
            name: 'Learning Object 1 - Integration Test',
            subject: 'Learning Object 1 subject',
            description: 'Learning Object 1 description',
            title: 'Learning Object 1 title',
            type: 'EXERCISE',
            format: 'IMAGE',
            metadata: {},
            enabled: true,
            learningObjectiveList: []
        },
        {
            id: 'integrationtestslo000002',
            name: 'Learning Object 2 - Integration Test',
            subject: 'Learning Object 2 subject',
            description: 'Learning Object 2 description',
            title: 'Learning Object 2 title',
            type: 'EXERCISE',
            format: 'IMAGE',
            metadata: {},
            enabled: true,
            learningObjectiveList: [
                {
                    id: 'integrationtestsloi00001',
                    name: 'Learning Objective 1 - Integration Test',
                    description: 'Learning Objective 1 - Integration Test Description',
                    learningObjectiveList: []
                }
            ]
        }
    ];
    return testData
}
