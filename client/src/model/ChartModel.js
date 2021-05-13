import http from "../services/httpService";

class Model {
	async getElectionsYears() {
		const { data: electionsYears } = await http.get("/elections-dates");
		return electionsYears;
	}

	async getElectedPartiesCount() {
		const electionsYears = await this.getElectionsYears();
		const electedPartiesCount = await Promise.all(
			electionsYears.map(async (electionYear) => {
				const url = `/elected-parties-count/${electionYear}`;
				const { data } = await http.get(url);
				return data;
			})
		);
		return electedPartiesCount;
	}
}

export default Model;
