const router = require("express").Router();
const mongoose = require("mongoose");
const Config = mongoose.model("config", new mongoose.Schema());

router.route("/:configName").get((req, res) => {
  Config.findOne({ name: req.params.configName }, (err, result) => {
    if (err) {
      res.json({ successful: false, err: err });
    } else {
      res.json({ successful: true, result: result });
    }
  });
});

module.exports = router;
