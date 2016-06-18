var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/user');
var ctrlAuth = require('../controllers/authentication');
var ctrlPerson = require('../controllers/person');

//user
router.get('/profile', auth, ctrlProfile.profileRead);

//user
router.put('/profile', auth, ctrlProfile.updateProfile);

//person
router.post('/person',auth, ctrlPerson.createPerson);
router.get('/people',auth, ctrlPerson.getPeople);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
