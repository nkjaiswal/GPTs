const N = 5;
const fs = require("fs");

const nGramProbabilityLookup = JSON.parse(
  fs.readFileSync("n-gram-probability-lookup.json", "utf-8")
);

const generateRandomCharAfter = (nGram) => {
  const random = Math.random(); //[0, 1]
  let sum = 0;
  const lookupObject = nGramProbabilityLookup[nGram];
  for (let key in lookupObject) {
    sum += lookupObject[key];
    if (random <= sum) {
      return key;
    }
  }
};

const generateName = (start = ">") => {
  let name = start;
  while (true) {
    const nGram = name.slice(-N);
    const nextChar = generateRandomCharAfter(nGram);
    if (nextChar === "<") {
      break;
    }
    name += nextChar;
  }
  return name;
};

const indianNames = JSON.parse(fs.readFileSync("final-names.json", "utf-8"));

let i = 0;
while (i < 10) {
  const name = generateName();
  if (indianNames.includes(name + "<")) {
    continue;
  }
  console.log(name);
  i++;
}
