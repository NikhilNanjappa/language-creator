// Generate phoneme inventory
const consonants = ['p', 't', 'k', 'f', 's', 'm', 'n'];
const vowels = ['a', 'e', 'i', 'o', 'u'];

// Define morphology
const morphology = {
  nounClasses: [
    {
      name: 'class 1',
      prefix: 'xa-',
      suffix: '-zu'
    },
    {
      name: 'class 2',
      prefix: 'no-',
      suffix: '-ki'
    }
  ],
  verbConjugations: [
    {
      name: 'present simple',
      suffixes: ['-mo', '-zo', '-to']
    },
    {
      name: 'past simple',
      suffixes: ['-ma', '-za', '-ta']
    }
  ]
};

// Define syntax
const syntax = {
  wordOrder: 'SVO',
  nounPhrases: [
    {
      structure: ['determiner', 'adjective', 'noun']
    }
  ],
  verbPhrases: [
    {
      structure: ['verb', 'adverb']
    }
  ]
};

// Generate a word from phonemes
function generateWord(consonants, vowels, minLength, maxLength) {
  let word = '';
  const length = randomNumber(minLength, maxLength);

  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      word += randomChoice(consonants);
    } else {
      word += randomChoice(vowels);
    }
  }

  return word;
}

// Generate a random number between min and max
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random element from an array
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a sentence
function generateSentence(lexicon, morphology, syntax) {
  const sentence = [];

  // Generate noun phrase
  const nounPhrase = generateNounPhrase(lexicon, morphology);
  sentence.push(nounPhrase);

  // Generate verb phrase
  const verbPhrase = generateVerbPhrase(lexicon, morphology);
  sentence.push(verbPhrase);

  // Form sentence from phrases based on word order
  return syntax.wordOrder
    .split('')
    .map((c) => {
      if (c === 'S') return nounPhrase;
      if (c === 'V') return verbPhrase;
    })
    .join(' ');
}

// Generate a noun phrase
function generateNounPhrase(lexicon, morphology) {
  const phrase = [];

  const nounPhraseRules = randomChoice(syntax.nounPhrases);

  for (let part of nounPhraseRules.structure) {
    let word;
    if (part === 'determiner') {
      word = 'the'; // placeholder determiner
    } else if (part === 'adjective') {
      word = randomChoice(lexicon); // placeholder adjective
    } else if (part === 'noun') {
      word = generateNoun(lexicon, morphology);
    }

    phrase.push(word);
  }

  return phrase.join(' ');
}

// Generate a verb phr§e
function generateVerbPhrase(lexicon, morphology) {
  const phrase = [];

  const verbPhraseRules = randomChoice(syntax.verbPhrases);

  for (let part of verbPhraseRules.structure) {
    let word;
    if (part === 'verb') {
      word = generateVerb(lexicon, morphology);
    } else if (part === 'adverb') {
      word = randomChoice(lexicon); // placeholder adverb
    }

    phrase.push(word);
  }

  return phrase.join(' ');
}

// Generate a random noun
function generateNoun(lexicon, morphology) {
  const nounClass = randomChoice(morphology.nounClasses);
  const nounStem = generateWord(consonants, vowels, 3, 6);
  return nounClass.prefix + nounStem + nounClass.suffix;
}

// Generate a random verb
function generateVerb(lexicon, morphology) {
  const verbStem = generateWord(consonants, vowels, 3, 6);
  const suffix = randomChoice(morphology.verbConjugations[0].suffixes);
  return verbStem + suffix;
}

// Generate lexicon
const lexicon = [];

for (let i = 0; i < 500; i++) {
  const nounClass = randomChoice(morphology.nounClasses);
  const nounStem = generateWord(consonants, vowels, 3, 6);
  const noun = nounClass.prefix + nounStem + nounClass.suffix;
  lexicon.push(noun);
}

for (let i = 0; i < 500; i++) {
  const verbStem = generateWord(consonants, vowels, 3, 6);
  const suffix = randomChoice(morphology.verbConjugations[0].suffixes);
  const verb = verbStem + suffix;
  lexicon.push(verb);
}

// Generate sentences
for (let i = 0; i < 100; i++) {
  const sentence = generateSentence(lexicon, morphology, syntax);
  console.log(sentence);
}
