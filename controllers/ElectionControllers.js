const ElectionModel = require("../models/ElectionModel");

// @desc    Get elected parties count by year
// @route   GET /elected-parties-count/:electionYear
// @access  Public
const getElecetdPartiesByYear = async (req, res) => {
	const { year: electionYear } = req.params;
	const url = "https://en.idi.org.il/israeli-elections-and-parties/elections";
	const electionModel = new ElectionModel(url, electionYear);
	const electedPartiesCount = await electionModel.getElectedPartiesCount();
	res.json(electedPartiesCount);
};

// @desc    Get  Election Dates
// @route   GET /election-dates
// @access  Public
const getAllElectionDates = async (req, res) => {
	const url = "https://en.idi.org.il/israeli-elections-and-parties/";
	const electionModel = new ElectionModel(url);
	const electionDates = await electionModel.getElectionDates();
	res.json(electionDates);
};
exports.getElecetdPartiesByYear = getElecetdPartiesByYear;
exports.getAllElectionDates = getAllElectionDates;
