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

                Person.findById(req.params.id, function(err,person)
                {
                    if (err)
                    {
                        res.status(404);
                        res.json
                        (
                            {
                                message: "Error occured: " + err
                            }
                        );
                    }
                    if(person)
                    {
                        var giftModel = new Gift();
                        giftModel.name = req.body.name;
                        giftModel.price = req.body.price;
                        giftModel.ownerId = req.params.id;
                        giftModel.x=req.body.x;
                        giftModel.y=req.body.y;
                        giftModel.ownerName=person.name;
                        giftModel.username=user.username;
                        var file = req.files.file;
                        var reader = new FileReader();
                        var img;
                        reader.readAsBinaryString(file);
                        reader.onload = function(readerEvt) {
                            var binaryString = readerEvt.target.result;
                            img = btoa(binaryString);
                            img = encodeURIComponent(img);
                            giftModel.img.data= img;
                            giftModel.img.contentType = req.body.type;
                            giftModel.save(function (err, gift)
                                {
                                    if (err)
                                    {
                                        res.status(404);
                                        res.json
                                        (
                                            {
                                                message: "Error occured: " + err
                                            }
                                        );
                                    }
                                    else
                                    {
                                        gift.save(function (err, gift1)
                                        {
                                            if (err)
                                            {
                                                res.status(404);
                                                res.json
                                                (
                                                    {
                                                        message: "Error occured: " + err
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                res.status(201);
                                                res.json
                                                (
                                                    {
                                                        success: true
                                                    }
                                                );
                                            }

                                        });
                                    }
                                }
                            );
                        };


                    }
                    else
                    {
                        res.status(404);
                        res.json
                        (
                            {
                                message:"person cannot be found"
                            }
                        )
                    }
                });


            });
    }

};

