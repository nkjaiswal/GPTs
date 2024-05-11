const N = 5;
const fs = require("fs");

const nGramProbablityLookupRaw = fs.readFileSync(
  "n-gram-probability-lookup.json",
  "utf8"
);
const nGramProbablityLookup = JSON.parse(nGramProbablityLookupRaw);

const ctoiRaw = fs.readFileSync("ctoi.json", "utf8");
const ctoi = JSON.parse(ctoiRaw);

const itoc = {};
for (let key in ctoi) {
  itoc[ctoi[key]] = key;
}

const getRandomCharAfter = (ngram) => {
  const random = Math.random();
  let sum = 0;
  const tuple = nGramProbablityLookup[ngram];
  for (let key in tuple) {
    sum += tuple[key];
    if (random <= sum) {
      return key;
    }
  }
};

const generateName = (start = ">") => {
  let name = start;
  while (true) {
    const nextChar = getRandomCharAfter(name.slice(-N));
    if (!nextChar) {
      console.log("No next char for " + name.slice(-N));
      break;
    }
    if (nextChar !== "<") {
      name += nextChar;
    } else {
      break;
    }
  }
  return name.slice(1);
};

const finalProcessedNames = JSON.parse(
  fs.readFileSync("final-names.json", "utf8")
);

let i = 0;
while (i < 10) {
  const name = generateName();
  if (!finalProcessedNames.includes(name)) {
    console.log(name);
    i++;
  }
}
