const router = require("express").Router();

const recordRouter = require("./record");
const recordsRouter = require("./records");

router.use("/record", recordRouter);
router.use("/records", recordsRouter);

module.exports = router;
