import React, { useRef, useState, useEffect } from "react";
import { FcInTransit } from "react-icons/fc";
import { CgSmartHomeWashMachine } from "react-icons/cg";

export default function CarpetComparison({}) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(50);

  useEffect(() => {
    function onMove(e) {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = containerRef.current.getBoundingClientRect();
      let x = clientX - rect.left;
      let pct = (x / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      setPos(pct);
    }

    function onUp() {
      setIsDragging(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.width = `${pos}%`;
    }
  }, [pos]);

  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const moveLeft = () => setPos((p) => Math.max(0, p - 10));
  const moveRight = () => setPos((p) => Math.min(100, p + 10));

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT: Text */}
        <div className="lg:pr-12">
          <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-6">
            Gilamlarni yuvish vaqti keldi
          </h3>
          <p className="text-lg text-white mb-8 leading-relaxed">
            Gilam, pol qoplamasi, matras va boshqa sirtni tozalash
            xizmatlarimizdan <strong>CHEGIRMA</strong> bilan foydalaning!
          </p>

          <div className="flex gap-8 mb-10">
            <div className="flex-1">
              <div className="flex flex-col items-start gap-4">
                <FcInTransit className="w-20 h-20" />

                <div>
                  <div className="text-xl font-medium text-white">
                    Shahar Ichida Yetkazib Berish Bepul
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col items-start gap-4">
                <CgSmartHomeWashMachine className=" w-20 h-20 text-white" />
                <div>
                  <div className="text-xl font-medium text-white">
                    Ekologik Toza Yuvish Vositallari Bilan Yuvish
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="inline-block bg-green-600 text-white font-semibold px-7 py-3 rounded shadow hover:opacity-95">
            Ko'proq O'qish
          </button>
        </div>

        {/* RIGHT: Before / After slider */}
        <div className="relative">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded shadow-lg"
            style={{ minHeight: 420 }}
            onMouseDown={(e) => startDrag(e)}
            onTouchStart={(e) => startDrag(e)}
          >
            {/* Right image (bottom) */}
            <img
              src="./gepk.jpg"
              alt="after"
              className="w-full h-full object-cover block"
              style={{ minHeight: 420 }}
            />

            {/* Overlay with left image clipped by width */}
            <div
              ref={overlayRef}
              className="absolute top-0 left-0 h-full w-1/2 overflow-hidden"
            >
              <img
                src="./gepk2.jpg"
                alt="before"
                className="w-full h-full object-cover block"
                style={{ minHeight: 420 }}
              />
            </div>

            <div
              className="absolute top-0 bottom-0 left-0 flex items-center justify-center"
              style={{
                left: `${pos}%`,
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
            >
              <div className="pointer-events-auto bg-white/90 shadow-md rounded-full w-12 h-12 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={moveLeft}
                    className="w-5 h-5 flex items-center justify-center"
                    aria-label="left"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18l-6-6 6-6"
                        stroke="#0F172A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="w-0.5 h-6 bg-gray-300" />
                  <button
                    onClick={moveRight}
                    className="w-5 h-5 flex items-center justify-center"
                    aria-label="right"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="#0F172A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating call buttons (bottom-right) */}
          {/* <div className="absolute right-0 bottom-0 transform translate-x-6 translate-y-6 flex flex-col items-end gap-4">
            <button className="w-14 h-14 rounded-full bg-purple-700 text-white shadow-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92V20a2 2 0 01-2.18 2 19 19 0 01-8.63-3.07 19 19 0 01-6-6A19 19 0 014.07 4.18 2 2 0 016 2h3.09a2 2 0 012 1.72c.12 1.05.38 2.07.76 3.03a2 2 0 01-.45 2.11L10.7 11.3a16 16 0 006 6l2.45-2.45a2 2 0 012.11-.45c.96.38 1.98.64 3.03.76A2 2 0 0122 16.92z"
                  stroke="none"
                  fill="white"
                />
              </svg>
            </button>

            <button className="w-12 h-12 rounded-full bg-white text-purple-700 shadow-lg flex items-center justify-center border-2 border-purple-700">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#6B21A8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
