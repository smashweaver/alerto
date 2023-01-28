const mono = 'mono';
const bi = 'bi';
const everyman = 'everyman';
const uberman = 'uberman';
const dymaxion = 'dymaxion';

const q1 = {
  question: 'How many total hours do you need to be awake?',
  choices: [
    {
      answer: '22',
      r: [dymaxion, uberman],
    },
    {
      answer: '19',
      r: [everyman],
    },
    {
      answer: '17',
      r: [bi],
    },
    {
      answer: '14-17',
      r: [mono],
    }
  ],
};


const q2 = {
  question: 'How many hours of sleep do you usually need?',
  choices: [
    {
      answer: '7 or more hours',
      r: [mono],
    },
    {
      answer: '5 to 6 hours plus Naps',
      r: [bi],
    },
    {
      answer: '3 to 4 hours plus Naps',
      r: [everyman],
    },
    {
      answer: 'Less than 3 hours using Naps',
      r: [dymaxion, uberman],
    },
  ],
};


const q3 = {
  question: 'How many naps do you usually take in a day?',
  choices: [
    {
      answer: '0 to 1 Nap',
      r: [mono, bi],
    },
    {
      answer: '2 to 3 Naps',
      r: [everyman],
    },
    {
      answer: '4 to 5 Naps',
      r: [dymaxion],
    },
    {
      answer: '5 or more Naps',
      r: [uberman],
    },
  ],
};

const q4 = {
  question: 'How long do your naps usually take?',
  choices: [
    {
      answer: '0 to 10 minutes',
      r: [mono],
    },
    {
      answer: '1 to 2 hours',
      r: [bi],
    },
    {
      answer: '20 minutes',
      r: [everyman, uberman],
    },
    {
      answer: '30 minutes',
      r: [dymaxion],
    },
  ],
};

const q5 = {
  question: 'When do you usually take Naps?',
  choices: [
    {
      answer: 'Do not usually take Naps',
      r: [mono],
    },
    {
      answer: '1 in the afternoon',
      r: [bi],
    },
    {
      answer: '2 or 3 throughout the day',
      r: [everyman],
    },
    {
      answer: 'Every 4 hours',
      r: [uberman],
    },
    {
      answer: 'Every 6 hours',
      r: [dymaxion],
    },
  ],
};

const q6 = {
  question: 'How long do you usually stay awake before sleeping or napping?',
  choices: [
    {
      answer: '14 hours or more',
      r: [mono],
    },
    {
      answer: '10 hours',
      r: [bi],
    },
    {
      answer: '5 hours',
      r: [everyman],
    },
    {
      answer: '6 hours',
      r: [dymaxion],
    },
    {
      answer: 'Less than 4 hours',
      r: [uberman],
    },
  ],
};

const q7 = {
  question: 'Do you usually take a nap during the day or afternoon?',
  choices: [
    {
      answer: 'Not at all',
      r: [mono],
    },
    {
      answer: 'Usually once',
      r: [bi],
    },
    {
      answer: '2 to 3 times',
      r: [everyman, dymaxion, uberman],
    },
  ],
};

const q8 = {
  question: 'Which statement describes you best?',
  choices: [
    {
      answer: 'I like to enjoy a nice long undisrupted sleep',
      r: [mono],
    },
    {
      answer: 'A nice long nap in the middle of the day sounds great',
      r: [bi],
    },
    {
      answer: 'I want more waking hours, but I do not want to over exhaust myself',
      r: [everyman],
    },
    {
      answer: 'I want to maximize the waking hours I can have in a day',
      r: [uberman, dymaxion],
    },
  ],
};

const surveyQuestions = [q1, q2, q3, q4, q5, q6, q7, q8];

const qcPair = (q) => {
  const choicesMap = new Map(q.choices.map(choice => [choice.answer, choice.r]));
  return [q.question, choicesMap];
};
const questionToChoicesMap = new Map(surveyQuestions.map(q => qcPair(q)));

const qaPair = (q) => [q.question, q.choices.map(choice => choice.answer)]
const questionToAnswersMap = new Map(surveyQuestions.map(q => qaPair(q)));

const questions = surveyQuestions.map(q => q.question);

const answerToCyclesMap = (question, answer) => {
  return questionToChoicesMap
  .get(question, answer);
};

export {
  questions,
  answerToCyclesMap,
  questionToAnswersMap,
}
