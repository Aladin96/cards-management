const auth = require("../controllers/auth");
const express = require("express");
const {requireAuth} =require("../middleware/auth")
const router = express.Router();

router.post("/", auth.createAccount);
router.get("/", auth.accounts)
router.post("/login", auth.login);
router.get("/isAuth", requireAuth, (req, res) =>{
    console.log(req.headers.authorization)
    return res.status(200).json(req.user)
});
module.exports = router;