/**
 * Created by pc on 19.6.2016 г..
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Gift = mongoose.model('Gift');
var Person = mongoose.model('Person');

module.exports.createGift = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                var gift = new Gift();

                gift.name=req.body.name;
                gift.x=req.body.x;
                gift.y=req.body.y;
                gift.ownerId=req.params.id;
                gift.price=req.body.price;
                gift.userName=user.name;
                gift.ownerName=user.name;
                gift.img-req.body.img;
                gift.save(function(err) {
                    res.status(200);
                    res.json(
                        gift
                    );
                });


            });
    }

};



