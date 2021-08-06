const { Record } = require("../db/models");
const validateRequest = require("../middlewares/validate-request");
const router = require("express").Router();
const { checkSchema, query, validationResult } = require("express-validator");
const { recordsSchema } = require("../validators");

router.get("/", [query("stock").isString().withMessage("stock is required.")], async (req, res) => {
  // Query validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // TODO: authentication
  const { stock } = req.query;
  const records = await Record.findAll({
    where: {
      stock: stock
    }
  });
  res.status(200).send({
    data: records
  });
});

router.post("/", checkSchema(recordsSchema), validateRequest, async (req, res, next) => {
  // TODO: authentication
  // TODO: Check replication

  try {
    const { data } = req.body;
    const respData = await Record.bulkCreate(data);
    res.status(200).send({
      data: respData
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      errors: ["Internal Server Error"]
    });
  }
});

module.exports = exports = router;
