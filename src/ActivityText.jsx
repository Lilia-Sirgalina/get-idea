import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

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

export default ActivityText;