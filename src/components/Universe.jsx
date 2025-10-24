import { useEffect } from "react";

export default function Universe() {
  useEffect(() => {
    const layerCount = 5;
    const starCount = 400;
    const maxTime = 500;
    const universe = document.getElementById("universe");
    if (!universe) return;

    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName("body")[0];
    const width = w.innerWidth || e.clientWidth || g.clientWidth;
    const height = w.innerHeight || e.clientHeight || g.clientHeight;

    for (let i = 0; i < starCount; ++i) {
      const ypos = Math.round(Math.random() * height);
      const star = document.createElement("div");
      const speed = 1000 * (Math.random() * maxTime + 1);
      star.setAttribute("class", "star" + (3 - Math.floor(speed / 1000 / 8)));
      star.style.backgroundColor = "white";
      star.style.position = "absolute";
      star.style.width = "2px";
      star.style.height = "2px";

      universe.appendChild(star);
      star.animate(
        [
          {
            transform: `translate3d(${width}px, ${ypos}px, 0)`,
          },
          {
            transform: `translate3d(-${Math.random() * 256}px, ${ypos}px, 0)`,
          },
        ],
        {
          delay: Math.random() * -speed,
          duration: speed,
          iterations: Infinity,
        }
      );
    }

    const elem = document.querySelector(".pulse");
    if (elem) {
      elem.animate(
        {
          opacity: [0.5, 1],
          transform: ["scale(0.1)", "scale(1)"],
        },
        {
          direction: "alternate",
          duration: 500,
          iterations: Infinity,
        }
      );
    }

    return () => {
      universe.innerHTML = "";
    };
  }, []);

  return (
    <div
      id="universe"
      className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 bg-black"
    ></div>
  );
}
