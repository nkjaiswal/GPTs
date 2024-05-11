const fs = require("fs");

const rawFemaleNames = fs.readFileSync("female-names.csv", "utf8");
const rawMaleNames = fs.readFileSync("male-names.csv", "utf8");

// Split the file into an array of names
const rawFemaleNamesArray = rawFemaleNames.split("\n");
const rawMaleNamesArray = rawMaleNames.split("\n");

const finalNames = [];
const allAlphabetsRegex = /^[A-Za-z]+$/;
let invalidNames = 0;
for (let data of [...rawFemaleNamesArray, ...rawMaleNamesArray]) {
  let [name] = data.split(",");
  name = name.trim().split(" ")[0];
  if (allAlphabetsRegex.test(name.trim())) {
    finalNames.push(name.trim());
  } else {
    invalidNames++;
  }
}

console.log("Invalid names:", invalidNames);
const finalProcessedNames = new Set(finalNames);
fs.writeFileSync("final-names.json", JSON.stringify([...finalProcessedNames]));
