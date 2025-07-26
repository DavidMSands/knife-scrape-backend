// match/calculateSimilarityScore.js
const { getSteelType, getMaker, getFinish, getLength, getKnifeType } = require('../utils/knifeUtils');
const _ = require('lodash');



const calculateSimilarityScore = (knifeA, knifeB) => {
  let score = 0;

  // Maker must match
  const makerA = getMaker(knifeA.title);
  const makerB = getMaker(knifeB.title);
  if (makerA !== makerB) return 0;

  // Knife type must match
  const typeA = getKnifeType(knifeA.title);
  const typeB = getKnifeType(knifeB.title);
  if (!typeA || !typeB || typeA !== typeB) return 0;

  // Maker (40 pts)
  score += 40;

  // Steel (30 pts)
  const steelA = getSteelType(knifeA.title);
  const steelB = getSteelType(knifeB.title);
  if (steelA && steelA === steelB) score += 30;

  // Finish (15 pts)
  const finishesA = getFinish(knifeA.title);
  const finishesB = getFinish(knifeB.title);
  const overlap = _.intersection(finishesA, finishesB).length;
  score += Math.min(overlap * 7.5, 15);

  // Length (15 pts)
  const lengthA = getLength(knifeA.title);
  const lengthB = getLength(knifeB.title);
  if (lengthA && lengthB) {
    const diff = Math.abs(lengthA - lengthB);
    if (diff <= 10) {
      score += (15 - (diff / 10) * 15); // linear falloff
    }
  }

  return Math.round(score); // out of 100
};

module.exports = { calculateSimilarityScore };
