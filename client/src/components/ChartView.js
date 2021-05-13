import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import ChartController from "../controller/ChartController";
import PreLoader from "../utils/pre-loader";

const ChartView = () => {
	const [electionsYears, setElectionsYears] = useState(null);
	const [electedPartiesCount, setElectedPartiesCount] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const chartController = new ChartController();
			const electionsYears = await chartController.getElectionsYears();
			const electedPartiesCount =
				await chartController.getElectedPartiesCount();

			setElectedPartiesCount(electedPartiesCount);
			setElectionsYears(electionsYears);
		};
		fetchData();
	}, []);

	const chartData = {
		labels: electionsYears,
		datasets: [
			{
				label: "מספר המפלגות שעברו את אחוז החסימה",
				data: electedPartiesCount,

				borderColor: ["rgba(255, 99, 132, 1)"],
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "מספר המפלגות שעברו את אחוז החסימה",
				fontSize: 25,
			},
		},
	};

	return (
		<div className='container'>
			<div className='row mt-5'>
				{!electedPartiesCount ? (
					<div className='col-lg-6 mx-auto'>
						<PreLoader />
					</div>
				) : (
					<Line data={chartData} options={chartOptions} />
				)}
			</div>
		</div>
	);
};

export default ChartView;
