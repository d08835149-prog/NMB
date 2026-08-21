"use client";

import type { CSSProperties } from "react";

type EffectsLayerProps = {
  effect: string;
};

const layerEffects = [
  "confetti",
  "fireworks",
  "stars",
  "explosion",
  "laser",
  "emojiStorm",
  "matrix",
  "clones",
];

const emojis = [
  "🗿",
  "🍌",
  "👁️",
  "🦆",
  "💀",
  "🥔",
  "🐟",
  "🛸",
  "🧀",
  "❓",
  "🔴",
];

const matrixCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?!@#$%&";

export default function EffectsLayer({ effect }: EffectsLayerProps) {
  if (!layerEffects.includes(effect)) {
    return null;
  }

  if (effect === "laser") {
    return (
      <div className="effects-layer laser" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span
            key={index}
            className="laser-beam"
            style={
              {
                "--y": `${Math.random() * 100}%`,
                "--rotation": `${Math.random() * 50 - 25}deg`,
                "--delay": `${Math.random() * 0.2}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  if (effect === "emojiStorm") {
    return (
      <div className="effects-layer emojiStorm" aria-hidden="true">
        {Array.from({ length: 50 }).map((_, index) => (
          <span
            key={index}
            className="emoji-particle"
            style={
              {
                "--x": `${Math.random() * 100}%`,
                "--delay": `${Math.random() * 0.3}s`,
                "--speed": `${0.7 + Math.random() * 0.5}s`,
                "--rotation": `${Math.random() * 720 - 360}deg`,
              } as CSSProperties
            }
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </span>
        ))}
      </div>
    );
  }

  if (effect === "matrix") {
    return (
      <div className="effects-layer matrix" aria-hidden="true">
        {Array.from({ length: 80 }).map((_, index) => (
          <span
            key={index}
            className="matrix-particle"
            style={
              {
                "--x": `${Math.random() * 100}%`,
                "--delay": `${Math.random() * 0.4}s`,
                "--speed": `${0.7 + Math.random() * 0.8}s`,
              } as CSSProperties
            }
          >
            {
              matrixCharacters[
                Math.floor(Math.random() * matrixCharacters.length)
              ]
            }
          </span>
        ))}
      </div>
    );
  }

  if (effect === "clones") {
    return (
      <div className="effects-layer clones" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="button-clone"
            style={
              {
                "--x": `${Math.random() * 100}%`,
                "--y": `${Math.random() * 100}%`,
                "--scale": 0.3 + Math.random() * 0.8,
                "--delay": `${Math.random() * 0.2}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  const particles = Array.from({ length: 50 });

  return (
    <div className={`effects-layer ${effect}`} aria-hidden="true">
      {particles.map((_, index) => (
        <span
          key={`${effect}-${index}`}
          className="particle"
          style={
            {
              "--i": index,
              "--x": Math.random(),
              "--y": Math.random(),
              "--r": `${Math.random() * 360}deg`,
              "--delay": `${Math.random() * 0.12}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}