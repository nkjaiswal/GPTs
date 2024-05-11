const N = 5;

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

const countLookup = {};

const generateNGramLookUp = (N) => {
  for (let name of startFixNames) {
    for (let i = 0; i < name.length - N; i++) {
      const ngram = name.slice(i, i + N);
      const char = name[i + N];
      if (countLookup[ngram] === undefined) {
        countLookup[ngram] = {};
      }
      if (countLookup[ngram][char] === undefined) {
        countLookup[ngram][char] = 0;
      }
      countLookup[ngram][char]++;
    }
  }
};

for (let i = 1; i <= N; i++) {
  generateNGramLookUp(i);
}
const str = JSON.stringify(countLookup, null, 2);
fs.writeFileSync("n-gram-count-lookup.json", str);

const nGramProbablityLookup = {};
for (let ngram in countLookup) {
  nGramProbablityLookup[ngram] = {};
  const total = Object.values(countLookup[ngram]).reduce(
    (acc, curr) => acc + curr,
    0
  );
  for (let char in countLookup[ngram]) {
    nGramProbablityLookup[ngram][char] = countLookup[ngram][char] / total;
  }
}

fs.writeFileSync(
  "n-gram-probability-lookup.json",
  JSON.stringify(nGramProbablityLookup, null, 2)
);
