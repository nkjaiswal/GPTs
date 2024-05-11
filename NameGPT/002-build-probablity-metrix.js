const fs = require("fs");

const finalProcessedNames = JSON.parse(
  fs.readFileSync("final-names.json", "utf8")
);

// mark the all text with ">" at start and end "<"
const startFixNames = [];
for (let name of finalProcessedNames) {
  startFixNames.push(`>${name.toLowerCase()}<`);
}

const ctoi = {};
ctoi["<"] = 0;
ctoi[">"] = 1;
let index = 2;
for (let i = 97; i <= 122; i++) {
  ctoi[String.fromCharCode(i)] = index++;
}
fs.writeFileSync("ctoi.json", JSON.stringify(ctoi));

const countMatrix = [];

for (let i = 0; i < 28; i++) {
  const row = [];
  for (let j = 0; j < 28; j++) {
    row.push(i == 0 ? 0 : 1);
  }
  countMatrix.push(row);
}

for (let name of startFixNames) {
  const nameLength = name.length;
  for (let i = 0; i < nameLength - 1; i++) {
    const char1 = name[i];
    const char2 = name[i + 1];
    countMatrix[ctoi[char1]][ctoi[char2]]++;
  }
}

const probabilityMatrix = [];
for (let i = 0; i < 28; i++) {
  const row = [];
  let rowSum = 0;
  for (let j = 0; j < 28; j++) {
    rowSum += countMatrix[i][j];
  }
  if (rowSum === 0) rowSum = 1;
  for (let j = 0; j < 28; j++) {
    row.push(countMatrix[i][j] / rowSum);
  }
  probabilityMatrix.push(row);
}

fs.writeFileSync("probability-matrix.json", JSON.stringify(probabilityMatrix));
