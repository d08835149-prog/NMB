"use client";

import type { CSSProperties } from "react";

type EffectsLayerProps = {
  effect: string;
  count: number;
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
  "teleport",
  "numbersEverywhere",
  "fakeCrash",
  "redFlood",
  "orbit",
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

export default function EffectsLayer({
  effect,
  count,
}: EffectsLayerProps) {
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

  if (effect === "teleport") {
  return (
    <div className="effects-layer teleport" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="teleport-button"
          style={
            {
              "--x": `${10 + Math.random() * 80}%`,
              "--y": `${10 + Math.random() * 80}%`,
              "--delay": `${index * 0.07}s`,
              "--scale": 0.5 + Math.random() * 0.7,
              "--rotation": `${Math.random() * 60 - 30}deg`,
            } as CSSProperties
          }
        />
      ))}

      <span className="teleport-final" />
    </div>
  );
  }

  if (effect === "numbersEverywhere") {
  return (
    <div
      className="effects-layer numbers-everywhere"
      aria-hidden="true"
    >
      {Array.from({ length: 35 }).map((_, index) => (
        <span
          key={index}
          className="flying-number"
          style={
            {
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--delay": `${Math.random() * 0.5}s`,
              "--scale": 0.5 + Math.random() * 2.5,
              "--rotation": `${Math.random() * 80 - 40}deg`,
            } as CSSProperties
          }
        >
          {count.toLocaleString()}
        </span>
      ))}

      <div className="mega-number">
        {count.toLocaleString()}
      </div>
    </div>
  );
  }

  if (effect === "fakeCrash") {
  return (
    <div className="effects-layer fake-crash" aria-hidden="true">
      <div className="crash-scanlines" />
      <div className="crash-noise" />

      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="crash-slice"
          style={
            {
              "--y": `${Math.random() * 100}%`,
              "--x": `${Math.random() * 40 - 20}px`,
              "--delay": `${Math.random() * 0.25}s`,
            } as CSSProperties
          }
        />
      ))}

      <div className="crash-center">
        NO SIGNAL
      </div>
    </div>
  );
  }

  if (effect === "redFlood") {
  return (
    <div className="effects-layer red-flood" aria-hidden="true">
      <div className="flood-wave flood-wave-one" />
      <div className="flood-wave flood-wave-two" />
      <div className="flood-fill" />
    </div>
  );
  }

  if (effect === "orbit") {
  return (
    <div className="effects-layer orbit" aria-hidden="true">
      <div className="orbit-center" />

      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="orbit-button"
          style={
            {
              "--angle": `${index * 30}deg`,
              "--delay": `${index * 0.03}s`,
              "--scale": 0.5 + Math.random() * 0.5,
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