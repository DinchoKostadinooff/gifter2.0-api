var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(
            {
                id:user.id,
                name: user.name,
                email:user.email
            }
            );
      });
  }

};

module.exports.updateProfile = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email ||user.email;

                user.setPassword(req.body.password );

                user.save(function(err) {
                    res.status(200);
                    res.json({
                        name:user.name,
                        email:user.email
                    });
                });
            });
    }

};
