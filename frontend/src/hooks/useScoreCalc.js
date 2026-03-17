import { EXAM_CONFIG } from '../utils/bcsConfig';

export const useScoreCalc = (answers, questions) => {
  let correct = 0, wrong = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] === undefined) return;
    if (answers[idx] === q.correctIndex) correct++;
    else wrong++;
  });
  const netScore = correct - (wrong * EXAM_CONFIG.NEGATIVE_MARKING);
  return { correct, wrong, netScore: parseFloat(netScore.toFixed(2)), total: questions.length };
};