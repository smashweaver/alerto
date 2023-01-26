import cycles from './schedules';
import config from './firebase';
import phasic from './phasic';
import {
  questions,
  questionToChoicesMap,
  questionToAnswersMap
} from './questions';

const firebase = { config };

export {
  cycles,
  firebase,
  phasic,
  questions,
  questionToChoicesMap,
  questionToAnswersMap,
};
