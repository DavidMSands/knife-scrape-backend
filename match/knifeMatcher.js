// match/knifeMatcher.js
const { getSteelType, getMaker, getFinish, getLength } = require('../utils/knifeUtils');
const _ = require('lodash');

const isSimilar = (knifeA, knifeB) => {
  const makerA = getMaker(knifeA.title);
  const makerB = getMaker(knifeB.title);

  const steelA = getSteelType(knifeA.title);
  const steelB = getSteelType(knifeB.title);

  const finishesA = getFinish(knifeA.title);
  const finishesB = getFinish(knifeB.title);

  const lengthA = getLength(knifeA.title);
  const lengthB = getLength(knifeB.title);

  return (
    _.isEqual(makerA, makerB) &&
    _.isEqual(steelA, steelB) &&
    _.intersection(finishesA, finishesB).length > 0 &&
    lengthA && lengthB && Math.abs(lengthA - lengthB) <= 10
  );
};

module.exports = { isSimilar };
