const N = 5;
const fs = require("fs");
const indianNames = JSON.parse(fs.readFileSync("final-names.json", "utf-8"));

const countLookup = {};
const generateNGramLookUp = (n) => {
  for (let name of indianNames) {
    for (let i = 0; i < name.length - n; i++) {
      const nGram = name.slice(i, i + n);
      const nextChar = name[i + n];
      if (countLookup[nGram] === undefined) {
        countLookup[nGram] = {};
      }
      if (countLookup[nGram][nextChar] === undefined) {
        countLookup[nGram][nextChar] = 0;
      }
      countLookup[nGram][nextChar]++;
    }
  }
};

for (let i = 1; i <= N; i++) {
  generateNGramLookUp(i);
}

fs.writeFileSync("n-gram-lookup.json", JSON.stringify(countLookup));

const nGramProbabilityLookup = {};

for (let nGram in countLookup) {
  nGramProbabilityLookup[nGram] = {};
  const total = Object.values(countLookup[nGram]).reduce((a, b) => a + b);
  for (let nextChar in countLookup[nGram]) {
    nGramProbabilityLookup[nGram][nextChar] =
      countLookup[nGram][nextChar] / total;
  }
}

fs.writeFileSync(
  "n-gram-probability-lookup.json",
  JSON.stringify(nGramProbabilityLookup)
);
