import ChartModel from "../model/ChartModel";

class ChartController {
	constructor() {
		this.chartModel = new ChartModel();
	}

	async getElectionsYears() {
		return await this.chartModel.getElectionsYears();
	}

	async getElectedPartiesCount() {
		return await this.chartModel.getElectedPartiesCount();
	}
}

export default ChartController;
