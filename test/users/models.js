'use strict';

// import the mongoose helper utilities
var utils = require('../utils');
var should = require('should');
// import our User mongoose model
var User = require('../../users/models').User;

describe ('Users: models', function () {
  describe('#create()', function () {
    it ('should create a new User', function () {
      var u = {
        name: {
          givenName: 'Barack',
          familyName: 'Obama'
        },
        emails: [
          {
            type:   'home',
            value:  'home@example.com'
          },
          {
            type:   'work',
            value:  'work@example.com'
          }
        ]
      };
      User.create(u, function (err, createdUser) {
        // confirm that an error does not exist
        should.not.exist(err);
        // verify that the returned user is what we expect
        createdUser.name.givenName.should.equal('Barack');
        createdUser.name.familyName.should.equal('Obama');
        // new tests
        createdUser.emails[0].type.should.equal('home');
        createdUser.emails[0].value.should.equal('home@example.com');
        createdUser.emails[1].type.should.equal('work');
        createdUser.emails[1].value.should.equal('work@exaple.com');
        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });
  describe('#hashPassword()', function () {
    it('should return a hashed pasword asynchronously', function (done) {
      var password = 'secret';

      User.hashPassword(password, function (err, passwordHash) {
        // Confirm that that an error does not exist
        should.not.exist(err);
        // Confirm that the passwordHash is not null
        should.exist(passwordHash);
        done();
      });
    });
  });
  describe('#comparePasswordAndHash()', function () {
    it('should return true if pasword is vaid', function (done) {
      var password = 'secret';

      // first we need to create a password hash
      User.hashPassword(password, function (err, passwordHash) {
        User.comparePasswordAndHash(password, passwordHash, function (err, areEqual) {
          // Confirm that an error does not exist
          should.not.exist(err);
          // Confirm that the areEqual is 'true'
          areEqual.should.equal(true);
          // notice how we call done() from the final callback
          done();
        });
      });
    });
  });

  it('should return false if password is invalid', function (done) {
    var password = 'secret';

    // first we need to create a password hash
    User.hashPassword(password, function (err, passwordHash) {
      var fakePassword = 'imahacker';

      User.comparePasswordAndHash(fakePassword, passwordHash, function (err, areEqual) {
        // Confirm that an error does not exist
        should.not.exist(err);
        //Confirm that they are Equal is 'false'
        areEqual.should.equal(false);
        done();
      });
    });
  });
});
