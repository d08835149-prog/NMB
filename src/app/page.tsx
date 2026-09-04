"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  effects,
  EffectItem,
  getRandomEffects,
} from "@/lib/effects";
import EffectsLayer from "@/components/EffectsLayer";

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [activeEffects, setActiveEffects] = useState<EffectItem[]>([]);
  const [warningAccepted, setWarningAccepted] = useState<boolean | null>(null);
  const [isClickLocked, setIsClickLocked] = useState(false);

  useEffect(() => {
    const accepted =
      localStorage.getItem("nmb-photosensitivity-warning") === "accepted";

    setWarningAccepted(accepted);
  }, []);

  useEffect(() => {
    const loadCounter = async () => {
      const { data, error } = await supabase
        .from("global_counter")
        .select("count")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(error);
        setError("Failed to load counter.");
        return;
      }

      setCount(Number(data.count));
    };

    loadCounter();

    const channel = supabase
      .channel("global-counter")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "global_counter",
          filter: "id=eq.1",
        },
        (payload) => {
          setCount(Number(payload.new.count));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const acceptWarning = () => {
    localStorage.setItem(
      "nmb-photosensitivity-warning",
      "accepted"
    );

    setWarningAccepted(true);
  };

  const runEffects = (selectedEffects: EffectItem[]) => {
    setActiveEffects([]);

    setTimeout(() => {
      setActiveEffects(selectedEffects);
    }, 20);

    const longestDuration = Math.max(
      ...selectedEffects.map((effect) => effect.duration)
    );

    setTimeout(() => {
      setActiveEffects([]);
    }, longestDuration + 50);
  };

  const runSingleEffect = (effect: EffectItem) => {
    runEffects([effect]);
  };

  const triggerRandomEffects = () => {
    runEffects(getRandomEffects());
  };

  const handleClick = async () => {
    if (isClickLocked) return;

    setIsClickLocked(true);
    setError("");

    triggerRandomEffects();

    const { data, error } = await supabase.rpc("increment_counter");

    if (error) {
      console.error(error);
      setError("Failed to update counter.");
    } else if (data !== null) {
      setCount(Number(data));
    }

    setTimeout(() => {
      setIsClickLocked(false);
    }, 150);
  };

  const pageClasses = activeEffects
    .filter(
      (effect) =>
        effect.category === "page" ||
        effect.category === "button"
    )
    .map((effect) => effect.name)
    .join(" ");

  const layerEffects = activeEffects
    .filter(
      (effect) =>
        effect.category === "layer" ||
        effect.category === "main"
    )
    .map((effect) => effect.name);

  if (warningAccepted === null) {
    return null;
  }

  return (
    <main className={`page ${pageClasses}`}>
      {!warningAccepted && (
        <div className="warning-overlay">
          <div className="warning-box">
            <div className="warning-icon">⚠</div>

            <h1 className="warning-title">
              Flashing Lights Warning
            </h1>

            <p className="warning-text">
              This site contains rapid flashing lights and visual effects
              that may affect people with photosensitive epilepsy.
            </p>

            <button
              className="warning-button"
              onClick={acceptWarning}
            >
              I understand
            </button>
          </div>
        </div>
      )}

      {layerEffects.map((effectName) => (
        <EffectsLayer
          key={effectName}
          effect={effectName}
          count={count ?? 0}
        />
      ))}

      {error ? (
        <p>{error}</p>
      ) : count === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="count">
            {count.toLocaleString()}
          </h1>

          <div className="button-wrap">
            <button
              className="button"
              onClick={handleClick}
              disabled={isClickLocked}
              aria-label="No Meaning Button"
            />
          </div>
        </>
      )}

      {process.env.NODE_ENV === "development" && (
        <div className="effect-debug-panel">
          <div className="effect-debug-title">
            EFFECT TEST
          </div>

          <div className="effect-debug-buttons">
            {effects.map((effectItem) => (
              <button
                key={effectItem.name}
                className="effect-debug-button"
                onClick={() => runSingleEffect(effectItem)}
              >
                {effectItem.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}