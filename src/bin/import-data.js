/* Set up environment variables */
require("dotenv").config();

// Dependencies
const neatCsv = require("neat-csv");
const fs = require("fs");
const db = require("../db/index");
const { Record } = require("../db/models");

// Arguments checking
if (!process.argv || process.argv.length < 3) {
  const helpMessage = [...process.argv, "<data file>"];
  console.log(`Usage: ${helpMessage.join(" ")}`);
  process.exit(1);
}

// Read content from csv
const csvSourcePath = process.argv[2];
const csvContent = fs.readFileSync(csvSourcePath, { encoding: "utf8", flag: "r" });

// Parse CSV content and add entries to database
(async () => {
  try {
    const parsedObjects = await neatCsv(csvContent);

    // Forced sync will drop the existing table
    await db.sync({ force: true });

    // Import data to database
    console.log("Seeding data into database");
    await Record.bulkCreate(parsedObjects);
    console.log(`Successfully inserted ${parsedObjects.length} records.`);
    await db.close();
  } catch (error) {
    console.log(error);
  }
})();
