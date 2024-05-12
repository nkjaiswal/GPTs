const fs = require("fs");

const probabilityMatrix = JSON.parse(
  fs.readFileSync("probability-matrix.json", "utf-8")
);
const ctoi = JSON.parse(fs.readFileSync("ctoi.json", "utf-8"));

let itoc = {};
for (let key in ctoi) {
  itoc[ctoi[key]] = key;
}

const generateRandomCharAfter = (char) => {
  const random = Math.random(); //[0, 1]
  let sum = 0;
  for (let i = 0; i < 28; i++) {
    sum += probabilityMatrix[ctoi[char]][i];
    if (random <= sum) {
      return itoc[i];
    }
  }
};

const generateName = (start = ">") => {
  let name = start === ">" ? "" : start;
  let char = start;
  while (true) {
    const nextChar = generateRandomCharAfter(char);
    if (nextChar === "<") {
      break;
    }
    name += nextChar;
    char = nextChar;
  }
  return name;
};

console.log(generateName());
