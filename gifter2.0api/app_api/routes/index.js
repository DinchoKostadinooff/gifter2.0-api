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
var ctrlGift = require('../controllers/gift');

//user
router.get('/profile', auth, ctrlProfile.profileRead);
router.put('/profile', auth, ctrlProfile.updateProfile);

//person
router.post('/person',auth, ctrlPerson.createPerson);
router.get('/people',auth, ctrlPerson.getPeople);
router.get('/person/:id',auth, ctrlPerson.getPersonById);
router.put('/person/:id',auth, ctrlPerson.updatePersonById);
router.delete('/person/:id',auth, ctrlPerson.DeletePersonById);

//gift
router.post('/gift/:id',auth,ctrlGift.createGift);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
