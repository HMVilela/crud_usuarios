var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://@localhost/pixelti', ['users']);

var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    //var user = users[_.findIndex(users, { id: jwt_payload.id })];
    db.users.findOne({
        _id: mongojs.ObjectId(jwt_payload.id)
    }, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

});
passport.use(strategy);

var today = new Date(Date.now()).toLocaleString();

//Get users/*passport.authenticate('jwt', { session: false }),*/
router.get('/users', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    db.users.find(function (err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

//Get single user by id
router.get('/user/:id', function (req, res, next) {
    db.users.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

//Save user
router.post('/user', function (req, res, next) {
    var user = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password,
        "created": today,
        "modified": today
    }
    db.users.save(user, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

//Update user
router.put('/user/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var user = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password,
        "created": req.body.created,
        "modified": today
    }

    if (!user) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.users.update({
            _id: mongojs.ObjectId(req.params.id)
        }, user, {}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Delete user
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    db.users.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


/*
     Login API
*/


router.post("/user/login", function (req, res) {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
    }
    db.users.findOne({
        email: email
    }, function (err, user) {
        if (!user) {
            res.status(401).json({ message: "Usuário não encontrado" });
        }
        if (user.password === req.body.password) {
            var payload = { id: user._id };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ message: "ok", token: token });
        } else {
            res.status(401).json({ message: "A senha é inválida" });
        }
    });
});


module.exports = router;