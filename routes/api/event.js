///api/event
const router = require("express").Router();
const Event = require("../../models/event.model");
const mongoose = require("mongoose");

router.route("/").get((req, res) => {
  Event.find({ expired: false })
    .sort({ createdAt: -1 })
    .exec((err, events) => {
      if (err) {
        res.status(400).json("Error: " + err);
      } else {
        res.json({ events: events });
      }
    });
  // .then((events) => res.json({ events: events }))
  // .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  if (req.isAuthenticated() && req.user.isOrganizer) {
    const event = new Event({ ...req.body, organizerId: req.user._id });

    event.save((err, event) => {
      if (err) {
        res.json({ isSuccessful: false, err: err });
      } else {
        res.json({ isSuccessful: true, event: event });
      }
    });
  } else {
    res.json({ isSuccessful: false });
  }
});

router.route("/edit").patch((req, res) => {
  if ((req.isAuthenticated() && req.user.isOrganizer) == false) {
    Event.find({ _id: req.body.eventId }, (err, event) => {
      if (err) {
        res.json({ successful: false, err: err });
      } else {
        event = { ...event, ...req.body };

        // event.title = req.body.title;
        // event.description = req.body.descrption;
        // event.individual = req.body.individual;
        // event.group = req.body.group;
        // event.minParticipants = req.body.minParticipants;
        // event.maxParticipants = req.body.maxParticipants;
        // event.eventDate = req.body.eventDate;
        // event.college = req.body.college;
        // event.registrationEndDate = req.body.registrationEndDate;
        // event.prize = req.body.prize;
        // event.organizerId = req.user._id;
        // event.views = req.body.views;
        // event.category = req.body.category;
        // event.formLink = req.body.formLink;

        event.save((err) => {
          if (err) {
            res.json({ successful: false, err: err });
          } else {
            res.json({ successful: true, event: event });
          }
        });
      }
    });
  }
});

router.route("/getEvent/:eventId").get((req, res) => {
  //  if (req.isAuthenticated()) {
  Event.findOne({ _id: req.params.eventId }, (err, event) => {
    if (err) {
      res.json({ successful: false, err: err });
    } else {
      res.json({ successful: true, event: event });
    }
  });
  //  }
});

module.exports = router;
