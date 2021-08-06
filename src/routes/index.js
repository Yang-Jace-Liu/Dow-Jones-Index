const router = require("express").Router();

const recordRouter = require("./record");

router.use("/record", recordRouter);

module.exports = router;
