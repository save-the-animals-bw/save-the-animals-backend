const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const organizationsRouter = require('../organizations/organizations_router.js');
const usersSupportRouter = require('../auth_support/users_support_router.js');
const usersOrganRouter = require('../auth_organization/users_organ_router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/organizations', organizationsRouter)
server.use('/api/users-support',usersSupportRouter)
server.use('/api/users-organization', usersOrganRouter)

server.get("/", (req, res) => {
  res.json({ message: "WELCOME TO SAVE-THE-ANIMALS DATABASE" });
});


module.exports = server;
