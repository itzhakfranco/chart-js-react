const request = require("request-promise");
const cheerio = require("cheerio");

class ElectionModel {
	url;
	electionYear;
	constructor(url, electionYear = null) {
		this.url = url;
		this.electionYear = electionYear;
	}

	async getElectedPartiesCount() {
		this.cheerioAPI = await this.getCheerioAPI(this.electionYear, this.url);
		this.electoralThreshold = await this.getElectoralThreshold(this.cheerioAPI);
		this.runningParties = await this.getRunningParties(this.cheerioAPI);
		this.electedPartiesCount = this.electedPartiesCount(
			this.runningParties,
			this.electoralThreshold
		);
		return this.castStringToNumber(this.electedPartiesCount);
	}

	async getElectionDates() {
		this.cheerioAPI = await this.getCheerioAPI(this.electionYear, this.url);
		this.electionDates = await this.electionDates(this.cheerioAPI);
		this.filteredElectionDate = this.filterElectionDates(this.electionDates);
		return this.filteredElectionDate;
	}

	async electionDates(cheerioAPI) {
		const electionDates = [];
		cheerioAPI(".type2 form option").each((i, htmlElement) => {
			electionDates.push(cheerioAPI(htmlElement).text());
		});
		return electionDates;
	}

	filterElectionDates(electionDates) {
		const filteredElectionDates = electionDates
			.map((htmlElement) =>
				htmlElement
					.replace(" ", "-")
					.replace("2019-April", "2019-1")
					.replace("2020", "2020-1")
			)
			.reverse();
		return filteredElectionDates;
	}

	async getCheerioAPI(electionYear = null, url) {
		try {
			const selectedUrl = electionYear ? `${url}/${electionYear}/` : url;
			const rawHTML = await request.get(selectedUrl);
			return await cheerio.load(rawHTML);
		} catch (err) {
			console.log(err);
		}
	}

	getElectoralThreshold(cheerioAPI) {
		const electoralThreshold = cheerioAPI(
			".elections > .text > .col-md-8 > .row:nth-of-type(1) > .col-sm-6:nth-child(2) > p"
		);
		const forrmatedElectoralThreshold = electoralThreshold
			.text()
			.trim()
			.slice(0, -1);
		return this.castStringToNumber(forrmatedElectoralThreshold);
	}

	getRunningParties(cheerioAPI) {
		const runningParties = [];
		cheerioAPI(".mCSB_container tbody tr").each((i, ele) => {
			const shareOfVotes = cheerioAPI(ele)
				.children("tr td:nth-child(4)")
				.text()
				.trim();
			const partyName = cheerioAPI(ele)
				.children("tr td:nth-child(1)")
				.text()
				.trim();
			const result = { partyName, shareOfVotes };
			runningParties.push(result);
		});
		return runningParties;
	}

	electedPartiesCount(runningParties, electoralThreshold) {
		return runningParties.filter(
			(party) => party.shareOfVotes >= electoralThreshold
		).length;
	}

	castStringToNumber(string) {
		return Number(parseFloat(string).toFixed(2));
	}
}
module.exports = ElectionModel;
