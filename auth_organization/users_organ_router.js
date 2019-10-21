const express = require("express");
const usersOrganModel = require("./users_organ_model.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

const checkAuthInput = require("./organ_checkAuthInput-middleware.js");

router.get("/", (req, res) => {
  usersOrganModel
    .findAllOrganUsers()
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
        .json({ message: "Failed to get Users-Organization list", err });
    });
});

router.get("/:id", (req, res) => {
  usersOrganModel
    .findOrganUserById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Could not find the organization user with the giving id"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Failed to get the organization user", err });
    });
});

router.post("/register",  checkAuthInput,(req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;

  usersOrganModel
    .addOrganUser(req.body)
    .then(user => {
      res.status(201).json({ message: "Account created!" });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to register", err });
    });
});

router.post("/login", (req, res) => {
  usersOrganModel
    .findOrganUserByName(req.body.username_o)
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Hi! ${user.username}`,
          token,
          username: `${user.username}`,
          userType: `${user.userType}`,
          organ_name: `${user.organ_name}`,
          organ_id: `${user.organization_id}`
        });
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
    username_o: user.username,
    subject: user.user_id,
    userType: user.userType
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
