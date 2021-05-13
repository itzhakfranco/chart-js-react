const express = require("express");
const router = express.Router();

const {
	getElecetdPartiesByYear,
	getAllElectionDates,
} = require("../controllers/ElectionControllers");

router.route("/elected-parties-count/:year").get(getElecetdPartiesByYear);
router.route("/elections-dates").get(getAllElectionDates);

module.exports = router;
