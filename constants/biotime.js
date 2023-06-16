import { useState } from "react";

export const bioQuiz = [
  {
    question: 'The slightest sound or light can keep me awake or wake me up.',
    choices: [{ answer: 'Yes', r: 1 }, { answer: 'No', r: 0 }],
  },
  {
    question: 'Food is not a good passion for me.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'I usually wake up before my alarm rings.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'I can\'t sleep well on planes, even with an eye mask or ear plugs.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'I\'m often irritable due to fatigue.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'I worry inordinately about small details.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'I have been diagnosed by a doctor or self-diagnosed as an insomniac.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'In school, I was anxious about my grades.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'I\'m a perfectionist.',
    choices: [{ answer: 'True', r: 1 }, { answer: 'False', r: 0 }],
  },
  {
    question: 'If you had nothing to do the next day and gave yourself permission to sleep in as long as you like, when would you wake up?',
    choices: [
      { answer: 'Before 6:30 a.m.', r: 1 },
      { answer: 'Between 6:30 a.m. and 8:45 a.m.', r: 2 },
      { answer: 'After 8:45 a.m.', r: 3 },
    ],
  },
  {
    question: 'When you have to get out of bed by a certain time, do you use an alarm clock?',
    choices: [
      { answer: 'No need. You wake up on your own at just the right time.', r: 1 },
      { answer: 'Yes to the alarm, with no snooze or one snooze.', r: 2 },
      { answer: 'Yes to the alarm, with a backup alarm, and multiple snoozes.', r: 3 },
    ],
  },
  {
    question: 'When do you wake up on the weekends?',
    choices: [
      { answer: 'The same time as your workweek schedule. ', r: 1 },
      { answer: 'Within forty-five to ninety minutes of your workweek schedule.', r: 2 },
      { answer: 'Ninety minutes or more past your workweek schedule', r: 3 },
    ],
  },
  {
    question: 'How do you experience jet lag?',
    choices: [
      { answer: 'You struggle with it, no matter what.', r: 1 },
      { answer: 'You adjust within forty-eight hours.', r: 2 },
      { answer: 'You adjust quickly, especially when traveling west.', r: 3 },
    ],
  },
  {
    question: 'What\'s your favorite meal? (Think time of day more than the menu.)',
    choices: [
      { answer: 'Breakfast', r: 1 },
      { answer: 'Lunch.', r: 2 },
      { answer: 'Dinner.', r: 3 },
    ],
  },
  {
    question: 'If you were to flash back to high school and take the SAT again, when would you prefer to start the test for maximum focus and concentration (not just to get it over with)?',
    choices: [
      { answer: 'Early morning.', r: 1 },
      { answer: 'Early afternoon.', r: 2 },
      { answer: 'Midafternoon.', r: 3 },
    ],
  },
  {
    question: 'If you could choose any time of day to do an intense workout, when would you do it?',
    choices: [
      { answer: 'Before 8:00 a.m.', r: 1 },
      { answer: 'Between 8:00 a.m. and 4:00 p.m.', r: 2 },
      { answer: 'After 4:00 p.m.', r: 3 },
    ],
  },
  {
    question: 'When are you most alert?',
    choices: [
      { answer: 'One to two hours post wake-up.', r: 1 },
      { answer: 'Two to four hours post wake-up.', r: 2 },
      { answer: 'Four to six hours post wake-up.', r: 3 },
    ],
  },
  {
    question: 'If you could choose your own five-hour workday, which block of consecutive hours would you choose?',
    choices: [
      { answer: '4:00 a.m. to 9:00 a.m.', r: 1 },
      { answer: '9:00 a.m. to 2:00 p.m.', r: 2 },
      { answer: '4:00 p.m. to 9:00 p.m.', r: 3 },
    ],
  },
  {
    question: 'Do you consider yourself…',
    choices: [
      { answer: 'Left-brained—that is, a strategic and analytical thinker', r: 1 },
      { answer: 'A balanced thinker', r: 2 },
      { answer: 'Right-brained—that is, a creative and insightful thinker', r: 3 },
    ],
  },
  {
    question: 'Do you nap?',
    choices: [
      { answer: 'Never.', r: 1 },
      { answer: 'Sometimes on the weekend.', r: 2 },
      { answer: 'If you took a nap, you\'d be up all night.', r: 3 },
    ],
  },
  {
    question: 'If you had to do two hours of hard physical labor, like moving furniture or chopping wood, when would you choose to do it for maximum efficiency and safety (not just to get it over with)?',
    choices: [
      { answer: '8:00 a.m. to 10:00 a.m.', r: 1 },
      { answer: '11:00 a.m. to 1:00 p.m.', r: 2 },
      { answer: '6:00 p.m. to 8:00 p.m.', r: 3 },
    ],
  },
  {
    question: 'Regarding your overall health, which statement sounds like you?',
    choices: [
      { answer: '“I make healthy choices almost all of the time.”', r: 1 },
      { answer: '“I make healthy choices sometimes.”', r: 2 },
      { answer: '“I struggle to make healthy choices.”', r: 3 },
    ],
  },
  {
    question: 'What\'s your comfort level with taking risks?',
    choices: [
      { answer: 'Low.', r: 1 },
      { answer: 'Medium.', r: 2 },
      { answer: 'High.', r: 3 },
    ],
  },
  {
    question: 'Do you consider yourself:',
    choices: [
      { answer: 'Future-oriented with big plans and clear goals.', r: 1 },
      { answer: 'Informed by the past, hopeful about the future, and aspiring to live in the moment.', r: 2 },
      { answer: 'Present-oriented. It\'s all about what feels good now.', r: 3 },
    ],
  },
  {
    question: 'How would you characterize yourself as a student?',
    choices: [
      { answer: 'Stellar.', r: 1 },
      { answer: 'Solid.', r: 2 },
      { answer: 'Slacker.', r: 3 },
    ],
  },
  {
    question: 'When you first wake up in the morning, are you…',
    choices: [
      { answer: 'Bright-eyed.', r: 1 },
      { answer: 'Dazed but not confused.', r: 2 },
      { answer: 'Groggy, eyelids made of cement.', r: 3 },
    ],
  },
  {
    question: 'How would you describe your appetite within half an hour of waking?',
    choices: [
      { answer: 'Very hungry.', r: 1 },
      { answer: 'Hungry.', r: 2 },
      { answer: 'Not at all hungry.', r: 3 },
    ],
  },
  {
    question: 'How often do you suffer from insomnia symptoms?',
    choices: [
      { answer: 'Rarely, only when adjusting to a new time zone.', r: 1 },
      { answer: 'Occasionally, when going through a rough time or are stressed out.', r: 2 },
      { answer: 'Chronically. It comes in waves.', r: 3 },
    ],
  },
  {
    question: 'How would you describe your overall life satisfaction?',
    choices: [
      { answer: 'High.', r: 0 },
      { answer: 'Good.', r: 2 },
      { answer: 'Low.', r: 4 },
    ],
  },
];


const bioResults = [
  { name: 'Lion', min: 19, max: 32 },
  { name: 'Bear', min: 33, max: 47 },
  { name: 'Wolf', min: 48, max: 61 },
];

function getBioResult(score) {
  const result = bioResults.find(({ min, max }) => score >= min && score <= max);
  return result.name;
}

function mapQuestionToAnswers() {
  const map = new Map();

  bioQuiz.forEach(({ question, choices }) => {
    const answerChoices = choices.map(({ answer }) => answer);
    map.set(question, answerChoices);
  });

  return map;
}

export function getResultFromAnswerToQuestion(question, answer) {
  const { choices } = bioQuiz.find(({ question: q }) => q === question);
  const { r } = choices.find(({ answer: a }) => a === answer);
  return r;
}

export const questionToAnswersMap = mapQuestionToAnswers();

export const questions = bioQuiz.map(({ question }) => question);

const questionAndAnswerResultMap = new Map(bioQuiz.map(({ question, choices }) => {
  const answerResultMap = new Map(choices.map(({ answer, r }) => [answer, r]));
  return [question, answerResultMap];
}));


function getResultEntries(result, startingIndex, count) {
  const entries = Object.entries(result);
  const endIndex = startingIndex + count;
  const resultEntries = entries.slice(startingIndex, endIndex);

  return resultEntries;
}

function getBioScore(entries) {
  console.log('*** getBioScore', { entries });
  let score = 0;
  for (const [question, answer] of entries) {
    const answerResultMap = questionAndAnswerResultMap.get(question);
    const result = answerResultMap.get(answer);
    score += result;
  }
  return score;
}

export function processPart1(result) {
  if (Object.keys(result).length === 9) {
    const score = getBioScore(getResultEntries(result, 0, 9));
    return [score, score >= 7];
  }
  return [0, false];
}

function processPart2(result) {
  const score = getBioScore(getResultEntries(result, 10, 20));
  const chronotype = getBioResult(score);
  return [score, chronotype];
}

export function useChronotype() {
  const [isProcessing, setProcessing] = useState(false);
  const [chronotype, setChronotype] = useState('');
  const [score, setScore] = useState(0);

  const process = (result) => {
    if (result === undefined) return;
    console.log('*** processing:', { result });
    setProcessing(true);

    const [score1, isDolphin] = processPart1(result);
    if (isDolphin) {
      setChronotype('Dolphin');
      setScore(score1);
    }

    if (!isDolphin) {
      const [score2, name] = processPart2(result);
      setScore(score2);
      setChronotype(name);
    }

    setProcessing(false);
  };

  console.log('*** useChronotype', { chronotype, score, process });

  return [chronotype, score, isProcessing, process];
}
