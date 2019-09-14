// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('./models/user');
const Event = require('../models/event');

const router = express.Router();

// api endpoints
router.get('/test', function(req, res) {
    res.send('quack');
});

router.get('/whoami', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});

router.get('/user', function(req, res) {
    User.findOne({ _id: req.query._id }, function(err, user) {
        res.send(user);
    });
}); // redudant with /whoami?

router.get('/events', function(req, res) {
    Event.find({}, function(err, events) { // TODO change to only events within given radius
        res.send(events);
    });
});

router.post(
    '/tagline',
    connect.ensureLoggedIn(),
    function(req, res) {
        User.findOne({ fbid: req.user.fbid }, function(err, user) {
            user.tagline = req.body.tagline;
            user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback.
        });
        res.send({});
    }
);

router.post(
    '/going',
    connect.ensureLoggedIn(),
    function(req, res) {
        User.findOne({ fbid: req.user.fbid }, function(err, user) {
            user.going_events.push(req.body.event_id);
            user.interested_events = user.interested_events.filer(function(value, index, arr) { return value != req.body.event_id });
            user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback.
        });
        res.send({});
    }
);

router.post(
    '/interested',
    connect.ensureLoggedIn(),
    function(req, res) {
        User.findOne({ fbid: req.user.fbid }, function(err, user) {
            user.going_events = user.going_events.filer(function(value, index, arr) { return value != req.body.event_id });
            user.interested_events.push(req.body.event_id);
            user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback.
        });
        res.send({});
    }
);

router.post(
    '/notgoing',
    connect.ensureLoggedIn(),
    function(req, res) {
        User.findOne({ fbid: req.user.fbid }, function(err, user) {
            user.going_events = user.going_events.filer(function(value, index, arr) { return value != req.body.event_id });
            user.interested_events = user.interested_events.filer(function(value, index, arr) { return value != req.body.event_id });
            user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback.
        });
        res.send({});
    }
);

router.post(
    '/event',
    connect.ensureLoggedIn(),
    function(req, res) {
        const newEvent = new Event({
            'creator_name'  : req.user.name,
            'creator_fbid'  : req.user.fbid,
            'description'   : req.body.description,
            'location'      : req.body.location,
            'coords'        : req.body.coords,
            'start_time'    : req.body.start_time,
            'end_time'      : req.body.end_time,
            'going'         : [req.user.fbid],
            'interested'    : [],
        });
  
        newEvent.save(function(err, event) {
            User.findOne({ fbid: req.user.fbid }, function(err, user) {
                user.going_events.push(event._id);
                user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback.
            });
            if (err) console.log(err);
        });
        res.send({});
    }
);

router.post(
    '/deleteevent', // TODO
    connect.ensureLoggedIn(),
    function(req, res) {
        
        res.send({});
    }
);

module.exports = router;
