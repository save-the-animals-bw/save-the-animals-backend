const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const organizationsRouter = require('../organizations/organizations_router.js');
const authRouter = require('../auth/users_router')
const campaignRouter = require('../campaigns/campaigns-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/organizations', organizationsRouter)

server.use('/api/auth', authRouter)
server.use('/api/campaigns', campaignRouter)

server.get("/", (req, res) => {
  res.json({ message: "WELCOME TO SAVE-THE-ANIMALS DATABASE" });
});


module.exports = server;
