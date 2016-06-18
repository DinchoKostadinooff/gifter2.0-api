/**
 * Created by pc on 18.6.2016 г..
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Gift = mongoose.model('Gift');
var Person = mongoose.model('Person');

module.exports.createPerson = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {

                Person.findOne({name:req.body.name}, function (err, person) {
                    if (err) {
                        res.status(404);
                        res.json
                        (
                            {
                                success: false,
                                message: "Error occured: " + err
                            }
                        );
                    }
                    else {
                        if(person){
                            res.status(404);
                            res.json
                            (
                                {
                                    message:"Person already exist"
                                }

                            )
                        }
                        else
                        {
                            var person = new Person();

                            person.name = req.body.name;
                            person.ownerId = user.id;

                            person.save(function(err) {
                                res.status(200);
                                res.json({
                                    owner:person.ownerId,
                                    name:person.name
                                });
                            });
                        }
                    }
                })



            });
    }

};

module.exports.getPeople = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                Person.find({ownerId:user.id}, function(err, person)
                {
                    if (err)
                    {
                        res.status(404);
                        res.json(
                            {
                                message: "Error occured: " + err
                            }
                        );
                    }
                    else
                    {
                        res.status(200);
                        res.json
                        (
                           person
                        );
                    }
                })
            });
    }

};

module.exports.getPersonById = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                Person.findById(req.params.id, function(err, person)
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
                        if (person)
                        {
                            res.json
                            (
                                {
                                    id:person.id,
                                    name:person.name
                                }
                            );
                        }
                        else
                        {
                            res.status(404);
                            res.json
                            (
                                {
                                    message:"No person for this user"
                                }
                            );
                        }
                    }
                });
            });
    }

};

module.exports.updatePersonById = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                Person.findById(req.params.id, function(err, person)
                {
                    if (err)
                    {
                        res.json
                        (   {
                                message:err
                            }
                        );
                    }
                    else{
                        if(person){
                            if(req.body.name===null){
                                res.status(404);
                                res.json
                                (
                                    {
                                        message: "Error occured:  name canot be null"
                                    }
                                );
                            }
                            person.name = req.body.name;
                            person.save(function(err)
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
                                    res.json
                                    (
                                        {
                                            name:person.name
                                        }
                                    );
                                }


                            });
                        }
                        else
                        {
                            res.status(404);
                            res.json
                            (
                                {
                                    message: "Error occured: "
                                }
                            );
                        }

                    }
                });
            });
    }

};

module.exports.DeletePersonById = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                apiRoutes.delete('/person/:id',function(req, res)
                {
                    Gift.find({ownerId:req.params.id}, function(err,docs){
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
                        docs.forEach( function (doc) {
                            doc.remove();
                        });
                    });
                    Person.findByIdAndRemove(req.params.id, function(err)
                    {
                        if (err)
                        {
                            res.status(404);
                            res.json
                            (
                                {
                                    success: false,
                                    message: "Error occured: " + err
                                }
                            );
                        }
                        else
                        {
                            res.json({ success: true });
                        }
                    });
                });
            });
    }

};

