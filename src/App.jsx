import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "./App.css"


export default function App() {
  const [activity, setActivity] = useState("Click the button and get advice!");

  const getActivity = async () => {
    const response = await fetch("https://bored.api.lewagon.com/api/activity");
    const data = await response.json();
    setActivity(data.activity);
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div className="container" >
      <h2>Bored? The universe thinks you should do this!</h2>

      <ActivityText text={activity} />

      <button onClick={getActivity} >
        Next Activity
      </button>
    </div>
  );
}

function ActivityText({ text }) {
  const wrapRef = useRef(null);

  // Важно: разбиваем текст на символы, но сохраняем пробелы
  const chars = useMemo(() => Array.from(text), [text]);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      const spans = wrapRef.current.querySelectorAll("[data-char]");

      // Сброс и стартовые позиции
      gsap.killTweensOf(spans);
      gsap.set(spans, {
        opacity: 0,
        x: () => gsap.utils.random(-18, 18),
        y: () => gsap.utils.random(-28, 28),
        rotate: () => gsap.utils.random(-20, 20),
        filter: "blur(6px)",
      });

      // Анимация "сборки"
      gsap.to(spans, {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 0.65,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.03,
          from: "random", // попробуй "center" если хочешь собирать из центра
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div className="text">
    <p
      ref={wrapRef}
      style={{        
        lineHeight: 1.25,
        margin: "18px 0 0",
      }}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          data-char
          style={{
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </p>
    </div>
  );
}
