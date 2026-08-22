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
  { name: "cataclysm", duration: 1800, category: "page" },

  // MAIN
  { name: "teleport", duration: 1500, category: "main" },
  { name: "numbersEverywhere", duration: 1600, category: "main", },
  { name: "fakeCrash", duration: 1400, category: "main", },
  { name: "redFlood", duration: 1700, category: "main", },
  { name: "orbit", duration: 1800, category: "main", },
];

function randomFromCategory(category: EffectCategory) {
  const available = effects.filter(
    (effect) => effect.category === category
  );

  return available[Math.floor(Math.random() * available.length)];
}

export function getRandomEffects(): EffectItem[] {
  const ultraRareRoll = Math.random();

  if (ultraRareRoll < 0.005) {
    const cataclysm = effects.find(
      (effect) => effect.name === "cataclysm"
    );

    return cataclysm ? [cataclysm] : [];
  }

  const roll = Math.random();

  let effectCount = 1;

  if (roll > 0.97) {
    effectCount = 3;
  } else if (roll > 0.80) {
    effectCount = 2;
  }

  const categories: EffectCategory[] = [
    "page",
    "button",
    "layer",
  ];

  const shuffled = [...categories].sort(() => Math.random() - 0.5);

  const mainRoll = Math.random();

  if (mainRoll < 0.08) {
    const mainEffects = effects.filter(
      (effect) => effect.category === "main"
    );

    return [
      mainEffects[
        Math.floor(Math.random() * mainEffects.length)
      ],
    ];
  }

  return shuffled
    .slice(0, effectCount)
    .map((category) => randomFromCategory(category));
}