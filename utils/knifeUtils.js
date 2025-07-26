// Returns true if the title indicates a knife set (e.g., contains 'set', 'knife set', etc.)
const isKnifeSet = (title) => {
  const norm = normalize(title);
  // Look for 'set' as a word, or 'knife set', or 'piece set', etc.
  return /\bset\b/.test(norm) || /\bknife set\b/.test(norm) || /\bpiece set\b/.test(norm);
};
// match/knifeUtils.js
const knownDistributors = ['Hatsukokoro', 'Kakushin', 'Konosuke'];

const steelAliases = {
  // Nigara proprietary steel
  'spg strix': ['spg strix', 'spgstrix', 'strix'],
  // Hitachi Carbon Steels (Blue / White Paper)
  'aogami super': ['aogami super', 'blue super', 'as', 'as/s', 'blue paper super', 'blue #super'],
  'aogami 1': ['aogami 1', 'blue 1', 'blue paper 1', 'blue #1'],
  'aogami 2': ['aogami 2', 'blue 2', 'blue paper 2', 'blue #2'],
  'shirogami 1': ['shirogami 1', 'shirogami #1', 'white 1', 'white paper 1', 'white #1'],
  'shirogami 2': ['shirogami 2', 'shirogami #2', 'white 2', 'white paper 2', 'white #2'],
  'shirogami 3': ['shirogami 3', 'shirogami #3', 'white 3', 'white paper 3', 'white #3'],

  // Powder Steels
  'sg2': ['sg2', 'r2'],
  'aeb-l': ['aeb-l', 'aeb l', 'aebl'],
  'ats-314': ['ats-314', 'ats314', 'ats 314'],
  'zdp-189': ['zdp-189', 'zdp189'],
  'hap40': ['hap40', 'hap-40'],
  'srs13': ['srs13', 'srs-13'],
  'srs15': ['srs15', 'srs-15'],


  // Stainless Steels
  'vg10': ['vg10', 'vg-10'],
  'vg10w': ['vg10w', 'vg-10w', 'vg 10w'],
  'vg xeos': ['vg xeos', 'vgxeos', 'xeos'],
  'dsr1k6': ['dsr1k6', 'dsr-1k6', 'dsr 1k6'],
  'molybdenum vanadium stainless steel': ['molybdenum vanadium stainless steel', 'mv stainless', 'molybdenum vanadium', 'mvs', 'molybdenum steel'],
  'cobalt special stainless steel': ['cobalt special stainless steel', 'cobalt special', 'cobalt stainless'],
  'nitrum': ['nitrum'],
  'vg1': ['vg1', 'vg-1'],
  'vg2': ['vg2', 'vg-2'],
  'vg5': ['vg5', 'vg-5'],
  'vgmax': ['vgmax', 'vg-max', 'vg max'],
  'aus8': ['aus8', 'aus-8'],
  'aus10': ['aus10', 'aus-10'],
  'ginsan': ['ginsan', 'ginsanko', 'gin-san', 'silver 3', 'gin3', 'gin-san ko', 'ginsan-ko'],
  'sus410': ['sus410', 'sus-410'],

  // Tool / Semi-Stainless
  'sk4': ['sk4', 'sk-4'],
  'acuto440': ['acuto440', 'acuto 440'],
  'sk5': ['sk5', 'sk-5'],
  'skd11': ['skd11', 'skd-11', 'dc53'],
  'skd12': ['skd12', 'skd-12'],
  'ycs3': ['ycs3', 'ycs-3'],
  'vs1': ['vs1', 'vs-1'],
  'sld': ['sld', 'sld steel', 'sld tool steel'],

  // Swedish & Western Steels used in Japanese knives
  'swedish stainless': ['swedish stainless', 'swedish inox', 'swedish steel'],
  'swedish carbon': ['swedish carbon', 'swedish white steel'],
  'x50crmov15': ['x50crmov15', '1.4116'],
  '440c': ['440c', '440-c'],
  '420j2': ['420j2', '420-j2', '420 j2'],
  'carpenter bd-1': ['carpenter bd-1', 'bd-1', 'carpenter bd1', 'bd1'],
  'yasuki hagane': ['yasuki hagane', 'yasuki steel', 'yasuki'],
  'v-toku 2': ['v-toku 2', 'vtoku2', 'v toku 2', 'v-toku2'],
  'vg7': ['vg7', 'vg-7', 'vg 7'],
  '52100': ['52100', 'sae 52100'],

  // Rare/Exotic
  'cowry x': ['cowry x', 'cowry-x'],
};

const normalize = (text) => {
  return text
    .toLowerCase()
    .replace(/[#/\\\-]/g, '') // remove common punctuation
    .replace(/\s+/g, ' ')     // collapse whitespace
    .trim();
};

const getSteelType = (title) => {
  const norm = normalize(title);
  for (const [canonical, aliases] of Object.entries(steelAliases)) {
    if (aliases.some(alias => norm.includes(normalize(alias)))) {
      return canonical;
    }
  }
  return null;
};

const getMaker = (title) => {
  const words = title.split(/\s+/);

  if (words.length > 1 && /^[A-Z]/.test(words[0]) && /^[A-Z]/.test(words[1])) {
    return words[0] + ' ' + words[1];
  }

  if (words[0] && knownDistributors.includes(words[0]) && words[1]) {
    return words[1];
  }
  return words[0];
};

const getFinish = (title) => {
  const finishes = ['tsuchime', 'kurouchi', 'migaki', 'damascus', 'nashiji', 'kasumi'];
  const norm = normalize(title);
  return finishes.filter(f => norm.includes(f));
};

const getLength = (title) => {
  const match = title.match(/(\d{3})mm/);
  return match ? parseInt(match[1], 10) : null;
};

const getKnifeType = (title) => {
  const types = [
    'gyuto', 'sujihiki', 'petty', 'nakiri', 'bunka', 'yanagiba', 'deba', 'kiritsuke',
    'santoku', 'honesuki', 'pankiri', 'usuba', 'takobiki', 'funayuki', 'garasuki', 'yo-deba', 'ko-deba', 'mioroshi', 'sakimaru', 'kengata', 'cleaver', 'chef', 'paring', 'utility', 'bread', 'carving', 'fillet', 'steak', 'boning', 'skin', 'butcher'
  ];
  const norm = normalize(title);
  for (const type of types) {
    if (norm.includes(type)) {
      return type;
    }
  }
  return null;
};

const isStrictKnifeMatch = (knifeA, knifeB) => {
  // Ignore if either is a knife set
  if ((knifeA.title && isKnifeSet(knifeA.title)) || (knifeB.title && isKnifeSet(knifeB.title))) {
    return false;
  }
  const extractFields = (knife) => {
    if (knife.title) {
      return {
        maker: getMaker(knife.title),
        steel: getSteelType(knife.title),
        length: getLength(knife.title),
        knifeType: getKnifeType(knife.title),
        finish: getFinish(knife.title).sort().join(','),
      };
    } else {
      return {
        maker: knife.maker,
        steel: knife.steel,
        length: knife.length,
        knifeType: knife.knifeType,
        finish: Array.isArray(knife.finish) ? knife.finish.sort().join(',') : (knife.finish || ''),
      };
    }
  };
  const a = extractFields(knifeA);
  const b = extractFields(knifeB);
  return (
    a.maker === b.maker &&
    a.steel === b.steel &&
    a.length === b.length &&
    a.knifeType === b.knifeType &&
    a.finish === b.finish
  );
};

module.exports = { getSteelType, getMaker, getFinish, getLength, getKnifeType, isStrictKnifeMatch, isKnifeSet };
