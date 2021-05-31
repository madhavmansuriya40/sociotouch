var CityTable = require("../models/tbl_city_data");
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
			fs.createReadStream("./Seeder/city.csv")
				.on("error", (err) => {
					console.log("err -->", err);
				})

				.pipe(csvParser())
				.on("data", (row) => {
					new CityTable({
						city_id: row["city_id"],
						city_name: row["city_name"],
                        state_id: row["state_id"],
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
