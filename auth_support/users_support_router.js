const express = require("express");
const usersSupportModel = require("./users_support_model.js");
const checkAuthInput = require('./support_checkAuthInput-middleware.js')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require('../config/secrets')

router.get("/", (req, res) => {
  usersSupportModel
    .findAllSupportUsers()
    .then(users => {
      if (!users[0]) {
        res.json(null);
      } else {
        res.json(users);
      }
      
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Failed to get Users-Support list", err });
    });
});

router.get("/:id", (req, res) => {
  usersSupportModel
    .findSupportUserById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Could not find the support user with the giving id"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get the support user", err });
    });
});

router.post("/register",checkAuthInput, (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;

  usersSupportModel
    .addSupportUser(req.body)
    .then(user => {
      res.status(201).json({ message: "Account created!" });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to register", err });
    });
});

router.post("/login", (req, res) => {
  usersSupportModel
    .findSupportUserByName(req.body.username_s)
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Hi! ${user.username_s}`, token });
      } else {
        res.status(401).json({ message: "Can't find user" });
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to login", err });
    });
});

function generateToken(user) {
  const payload = {
    username_s: user.username_s,
    subject: user.id,
    userType: user.userType
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}
module.exports = router;
