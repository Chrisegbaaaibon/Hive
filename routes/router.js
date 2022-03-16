// Routes
const router = require("express").Router();
const { AddEmail, GetEmails, sendMails } = require("../controller.js/handler");

router.use((req, res, next) => {
  console.log("Good to go!");
  next();
});

router.post("/addEmail", AddEmail);
router.get("/emails", GetEmails);
module.exports = router;