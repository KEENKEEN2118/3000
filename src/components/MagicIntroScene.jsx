import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMagic,
  FaMeteor,
} from "react-icons/fa";
import "../styles/MagicIntroScene.css";

export default function MagicIntroScene({ onBegin }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const audioRef = useRef(new Audio("/audio/magic-opening.mp3"));

  const [portalOpen, setPortalOpen] = useState(false);

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (sceneRef.current) {
        const x =
          (e.clientX / window.innerWidth - 0.5) * 20;

        const y =
          (e.clientY / window.innerHeight - 0.5) * 20;

        sceneRef.current.style.transform =
          `perspective(1400px)
           rotateY(${x / 6}deg)
           rotateX(${-y / 6}deg)`;
      }
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];

    for (let i = 0; i < 320; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        alpha: Math.random(),
        speed: 0.2 + Math.random() * 0.5,
        twinkle: Math.random() * 0.03,
      });
    }

    const shootingStars = [];

    function spawnMeteor() {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: -100,
        len: 150 + Math.random() * 150,
        speed: 8 + Math.random() * 6,
      });
    }

    setInterval(() => {
      if (Math.random() < 0.7) {
        spawnMeteor();
      }
    }, 4500);

    function drawNebula() {
      const gradient =
        ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          100,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width
        );

      gradient.addColorStop(
        0,
        "rgba(170,80,255,0.15)"
      );

      gradient.addColorStop(
        0.4,
        "rgba(120,50,220,0.12)"
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    function animate() {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      drawNebula();

      stars.forEach((s) => {
        s.alpha +=
          (Math.random() - 0.5) * s.twinkle;

        if (s.alpha < 0.2) s.alpha = 0.2;
        if (s.alpha > 1) s.alpha = 1;

        ctx.beginPath();

        ctx.fillStyle =
          `rgba(255,255,255,${s.alpha})`;

        ctx.arc(
          s.x,
          s.y,
          s.r,
          0,
          Math.PI * 2
        );

        ctx.fill();

        s.y += s.speed;

        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });

      shootingStars.forEach((m, index) => {
        ctx.strokeStyle =
          "rgba(205,170,255,.9)";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(m.x, m.y);

        ctx.lineTo(
          m.x - m.len,
          m.y - m.len / 2
        );

        ctx.stroke();

        m.x += m.speed;
        m.y += m.speed;

        if (m.y > canvas.height + 200) {
          shootingStars.splice(index, 1);
        }
      });

      requestAnimationFrame(
        animate
      );
    }

    animate();

    window.addEventListener(
      "resize",
      () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    );
  }, []);

const beginMagic = () => {

  setPortalOpen(true);

  audioRef.current.currentTime = 0;
  audioRef.current.volume = 0.8;

  audioRef.current.play();

  audioRef.current.onended = () => {
    onBegin?.();
  };

};

  return (
    <motion.div
      className={`magic-scene ${
        portalOpen ? "opening" : ""
      }`}
      ref={sceneRef}
    >
      <canvas
        ref={canvasRef}
        className="star-canvas"
      />

      <div className="purple-fog"></div>

      <div className="portal-wrapper">

        <div className="portal-glow"></div>

        <svg
          className="portal-ring outer-ring"
          viewBox="0 0 500 500"
        >
          <circle
            cx="250"
            cy="250"
            r="180"
            fill="none"
            stroke="rgba(170,100,255,.5)"
            strokeWidth="4"
            strokeDasharray="18 14"
          />
        </svg>

        <svg
          className="portal-ring inner-ring"
          viewBox="0 0 500 500"
        >
          <circle
            cx="250"
            cy="250"
            r="140"
            fill="none"
            stroke="rgba(255,255,255,.4)"
            strokeWidth="2"
            strokeDasharray="6 14"
          />
        </svg>

        <div className="portal-core"></div>

        <div className="portal-energy"></div>
                {/* Floating magical particles */}
        <div className="magic-particles">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

      </div>

      <motion.div
        className="magic-content"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
        }}
      >
        <div className="magic-icon">
          <FaMagic />
        </div>

        <h1 className="magic-title">
          EXPERIENCE
          <br />
          THE MAGIC
        </h1>

        <p className="magic-subtitle">
          A magical adventure is about to begin...
        </p>

        <motion.button
          className="begin-button"
          whileHover={{
            scale: 1.08,
            boxShadow:
              "0 0 45px rgba(170,80,255,.9)",
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={beginMagic}
        >
          BEGIN THE MAGIC
        </motion.button>
      </motion.div>

      <div className="corner-stars top-left">
        <FaStar />
      </div>

      <div className="corner-stars top-right">
        <FaStar />
      </div>

      <div className="corner-stars bottom-left">
        <FaStar />
      </div>

      <div className="corner-stars bottom-right">
        <FaStar />
      </div>

      <div className="floating-meteor">
        <FaMeteor />
      </div>

    </motion.div>
  );
}