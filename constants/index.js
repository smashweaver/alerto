import config from './firebase';
import phasic from './phasic';
import {
  questions,
  answerToCyclesMap,
  questionToAnswersMap,
} from './questions';

const firebase = { config };

import {
  cycleToEventsMap,
  cycleToNameMap,
} from './schedules';

export {
  firebase,
  phasic,
  questions,
  answerToCyclesMap,
  questionToAnswersMap,
  cycleToEventsMap,
  cycleToNameMap,

};
