const fs = require("fs");

/*
 "<" : 0,
 ">" : 1,
 a: 2,
 b: 3,
 ...
 z: 27
*/

const ctoi = {};
ctoi["<"] = 0;
ctoi[">"] = 1;
let index = 2;
for (let i = 97 /*a*/; i <= 122 /*z*/; i++) {
  ctoi[String.fromCharCode(i)] = index++;
}

fs.writeFileSync("ctoi.json", JSON.stringify(ctoi));

const countMatrix = [];
for (let i = 0; i < 28; i++) {
  const row = [];
  for (let j = 0; j < 28; j++) {
    row.push(i === 0 ? 0 : 1);
  }
  countMatrix.push(row);
}

const indianNames = JSON.parse(fs.readFileSync("final-names.json", "utf-8"));

for (let name of indianNames) {
  const nameLength = name.length; //name=nishant, nameLength=7
  for (let i = 0; i < nameLength - 1; i++) {
    const char1 = name[i]; //n
    const char2 = name[i + 1]; //i
    const char1Index = ctoi[char1]; //char1Index=14
    const char2Index = ctoi[char2]; //char2Index=9
    countMatrix[char1Index][char2Index]++;
  }
}

const probabilityMatrix = [];
for (let i = 0; i < 28; i++) {
  if (i === 0) {
    probabilityMatrix.push(Array(28).fill(0));
    continue;
  }
  const rowSum = countMatrix[i].reduce((a, b) => a + b);
  const row = countMatrix[i].map((count) => count / rowSum);
  probabilityMatrix.push(row);
}

fs.writeFileSync("probability-matrix.json", JSON.stringify(probabilityMatrix));
