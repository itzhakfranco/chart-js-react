const express = require("express");
const app = express();
const path = require("path");
const electionRoute = require("./routes/electionRoute");

if (process.env.NODE_ENV != "production") {
	const cors = require("cors");
	app.use(cors());
}

app.use(express.json());
app.use("/", electionRoute);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
	});
}

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
