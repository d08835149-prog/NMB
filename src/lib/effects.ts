export type EffectCategory = "page" | "button" | "layer" | "main";

export type EffectItem = {
  name: string;
  duration: number;
  category: EffectCategory;
};

export const effects: EffectItem[] = [
  // BUTTON
  { name: "pulse", duration: 400, category: "button" },
  { name: "grow", duration: 400, category: "button" },
  { name: "spin", duration: 500, category: "button" },
  { name: "wave", duration: 500, category: "button" },
  { name: "tilt", duration: 400, category: "button" },
  { name: "bounce", duration: 550, category: "button" },

  // PAGE
  { name: "shake", duration: 300, category: "page" },
  { name: "flash", duration: 350, category: "page" },
  { name: "rainbow", duration: 700, category: "page" },
  { name: "blackout", duration: 500, category: "page" },
  { name: "invert", duration: 500, category: "page" },
  { name: "zoom", duration: 450, category: "page" },
  { name: "earthquake", duration: 400, category: "page" },
  { name: "blur", duration: 500, category: "page" },
  { name: "disco", duration: 650, category: "page" },
  { name: "glitch", duration: 500, category: "page" },
  { name: "screenRotate", duration: 700, category: "page" },

  // LAYER
  { name: "confetti", duration: 900, category: "layer" },
  { name: "fireworks", duration: 800, category: "layer" },
  { name: "stars", duration: 900, category: "layer" },
  { name: "explosion", duration: 650, category: "layer" },
  { name: "laser", duration: 800, category: "layer" },
  { name: "emojiStorm", duration: 1200, category: "layer" },
  { name: "matrix", duration: 1400, category: "layer" },
  { name: "clones", duration: 900, category: "layer" },

  // ULTRA RARE
  { name: "cataclysm", duration: 1800, category: "page" },

  // MAIN
  { name: "teleport", duration: 1500, category: "main" },
  {
    name: "numbersEverywhere",
    duration: 1600,
    category: "main",
  },
  { name: "fakeCrash", duration: 1400, category: "main" },
  { name: "redFlood", duration: 1700, category: "main" },
  { name: "orbit", duration: 1800, category: "main" },

  // NEW
  { name: "gravity", duration: 1700, category: "main" },
  { name: "counterCorrupt", duration: 1500, category: "main" },
  { name: "fake404", duration: 1800, category: "main" },
];


const recentEffects: string[] = [];

const MAX_RECENT_EFFECTS = 6;

function rememberEffects(selectedEffects: EffectItem[]) {
  for (const effect of selectedEffects) {
    recentEffects.push(effect.name);
  }

  while (recentEffects.length > MAX_RECENT_EFFECTS) {
    recentEffects.shift();
  }
}

function randomFromCategory(
  category: EffectCategory,
  excludedNames: string[] = []
): EffectItem {
  const available = effects.filter(
    (effect) =>
      effect.category === category &&
      effect.name !== "cataclysm" &&
      !recentEffects.includes(effect.name) &&
      !excludedNames.includes(effect.name)
  );


  const fallback = effects.filter(
    (effect) =>
      effect.category === category &&
      effect.name !== "cataclysm" &&
      !excludedNames.includes(effect.name)
  );

  const pool = available.length > 0 ? available : fallback;

  return pool[Math.floor(Math.random() * pool.length)];
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function getRandomEffects(): EffectItem[] {
  /*
    0.5%
    Ultra Rare
  */
  const ultraRareRoll = Math.random();

  if (ultraRareRoll < 0.005) {
    const cataclysm = effects.find(
      (effect) => effect.name === "cataclysm"
    );

    if (cataclysm) {
      rememberEffects([cataclysm]);
      return [cataclysm];
    }
  }


  const mainRoll = Math.random();

  if (mainRoll < 0.07) {
    const mainEffect = randomFromCategory("main");

    rememberEffects([mainEffect]);

    return [mainEffect];
  }


  const roll = Math.random();

  let effectCount = 1;

  if (roll < 0.02) {
    effectCount = 3;
  } else if (roll < 0.10) {
    effectCount = 3;
  } else if (roll < 0.35) {
    effectCount = 2;
  }

  const categories: EffectCategory[] = [
    "page",
    "button",
    "layer",
  ];

  const shuffledCategories = shuffle(categories);

  const selectedEffects: EffectItem[] = [];

  for (const category of shuffledCategories.slice(0, effectCount)) {
    const selected = randomFromCategory(
      category,
      selectedEffects.map((effect) => effect.name)
    );

    selectedEffects.push(selected);
  }


  const chaosRoll = Math.random();

  if (chaosRoll < 0.02 && selectedEffects.length < 3) {
    const unusedCategories = categories.filter(
      (category) =>
        !selectedEffects.some(
          (effect) => effect.category === category
        )
    );

    if (unusedCategories.length > 0) {
      const extraCategory =
        unusedCategories[
          Math.floor(Math.random() * unusedCategories.length)
        ];

      const extraEffect = randomFromCategory(
        extraCategory,
        selectedEffects.map((effect) => effect.name)
      );

      selectedEffects.push(extraEffect);
    }
  }

  rememberEffects(selectedEffects);

  return selectedEffects;
}