const User = require("../user.model");
const { Student } = require("../models/student")
const sendEmail = require("./email.send");
const msgs = require("./email.msgs");
const templates = require("./email.templates");
const express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var ObjectId = require('mongoose').Types.ObjectId;

exports.collectEmail = (req, res) => {
  const { email } = req.body;

  Student.findOne({ email })
    .then(user => {
      /* if new user, send confirm email*/
      if (!user) {
        User.create({ email })
          .then(newUser =>
            sendEmail(newUser.email, templates.confirm(newUser._id)))
          .then(() => res.json({ msg: msgs.confirm }))
          .catch(err => console.log(err));
      } else if (user && !user.confirmed) {
        /* User that not been confirmed resend confirmation email*/
        sendEmail(user.email, templates.confirm(user._id)).then(() =>
          res.json({ msg: msgs.resend })
        );
      } else {
        /* Handling confired user*/
        res.json({ msg: msgs.alreadyConfirmed });
      }
    })
    .catch(err => console.log(err));
};

/*
  After user clicked confirmation url, fetched request sented.
  Corresponding to Confirm.js
*/
exports.confirmEmail = (req, res) => {
  const { id } = req.params;

  Student.findById(id)
    .then(user => {
      if (!user) {
        res.json({ msg: msgs.couldNotfound });
      } else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: msgs.confirmed }))
          .catch(err => console.log(err));
      } else {
        res.json({ msg: msgs.alreadyConfirmed });
      }
    })
    .catch(err => console.log(err));
};
