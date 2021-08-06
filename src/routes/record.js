const { Record } = require("../db/models");
const validateRequest = require("../middlewares/validate-request");
const router = require("express").Router();
const { checkSchema } = require("express-validator");
const { recordSchema } = require("../validators");

router.post("/", checkSchema(recordSchema), validateRequest, async (req, res, next) => {
  // TODO: authentication
  // TODO: Check replication
  try {
    const record = await Record.create(req.body);
    res.status(200).send({
      data: record
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      errors: ["Internal Server Error"]
    });
  }
});

module.exports = exports = router;
