var StateTable = require("../models/tbl_state");
var mongoose = require("mongoose");
require("dotenv").config();
const csvParser = require("csv-parser");
const fs = require("fs");

mongoose
	.connect(process.env.DB_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((success) => {
		if (success) {
			fs.createReadStream("./Seeder/state.csv")
				.on("error", (err) => {
					console.log("err -->", err);
				})

				.pipe(csvParser())
				.on("data", (row) => {
					new StateTable({
						id: row["id"],
						name: row["name"],
					}).save((err, res) => {
						if (err) {
							console.log("error while saving -->", err);
						}
					});
				})

				.on("end", () => {
				});
		}
	})
	.catch((err) => {
		console.log("in catch -->", err);
	});
