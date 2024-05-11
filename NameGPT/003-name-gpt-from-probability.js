const fs = require("fs");

const probabilityMatrixRaw = fs.readFileSync("probability-matrix.json", "utf8");
const probabilityMatrix = JSON.parse(probabilityMatrixRaw);

const ctoiRaw = fs.readFileSync("ctoi.json", "utf8");
const ctoi = JSON.parse(ctoiRaw);

const itoc = {};
for (let key in ctoi) {
  itoc[ctoi[key]] = key;
}

const getRandomCharAfter = (char) => {
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < 28; i++) {
    sum += probabilityMatrix[ctoi[char]][i];
    if (random <= sum) {
      return i;
    }
  }
};

const generateName = (start = ">") => {
  let name = start === ">" ? "" : start;
  let char = start;
  while (true) {
    const nextCharIndex = getRandomCharAfter(char);
    char = itoc[nextCharIndex];
    if (char !== "<") {
      name += char;
    } else {
      break;
    }
  }
  return name.length > 2 && name.length < 15 ? name : generateName(start);
};

for (let i = 0; i < 10; i++) {
  console.log(generateName());
}
