import { useState } from 'react';
import {
  questions,
  cycleToNameMap,
  answerToCyclesMap
} from '../constants';

function analyzeResult(result) {
  const scores = {
    mono: 0,
    bi: 0,
    everyman: 0,
    uberman: 0,
    dymaxion: 0,
  };

  const toCycles = (question, answer) => {
    return answerToCyclesMap(question, answer)
    .get(answer);
  };

  questions.forEach(question => {
    const answer = result[question];
    toCycles(question, answer)
    .forEach(cycle => {
      scores[cycle]++;
    });
  });

  return { ...scores };
}

function reduceByScore(scores) {
  let recommendation = [];
  let highestScore = 0;

  for (let cycle in scores) {
    if (scores[cycle] > highestScore) {
      recommendation = [cycle];
      highestScore = scores[cycle];
    } else if (scores[cycle] === highestScore) {
      recommendation.push(cycle);
    }
  }

  return [...recommendation];
}

function mapToCycleName(recommendations) {
  return recommendations.map(cycle => cycleToNameMap[cycle])
}

export default function useRecommender() {
  const [isProcessing, setProcessing] = useState(false);
  const [cycles, setCycles] = useState([]);

  const create = (result) => {
    const scores = analyzeResult(result);
    const schedules = reduceByScore(scores);
    return mapToCycleName(schedules);
  };

  const process = (result) => {
    setProcessing(true);
    const schedules = create(result);
    setCycles([...schedules])
    setProcessing(false);
  };

  return [cycles, isProcessing, process];
}
