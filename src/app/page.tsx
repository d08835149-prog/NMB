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
    setError("");

    triggerRandomEffects();

    const { data, error } = await supabase.rpc("increment_counter");

    if (error) {
      console.error(error);
      setError("Failed to update counter.");
      return;
    }

    if (data !== null) {
      setCount(Number(data));
    }
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

  return (
    <main className={`page ${pageClasses}`}>
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





