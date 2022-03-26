const express = require("express");
const router = express.Router();
const {addClient, browseClients, getClients} = require("../controllers/client");

// * get Clients
router.get("/all", getClients)

// * Add Client
router.post("/", addClient);

// * Browse Client

router.get("/", browseClients);

module.exports = router;

