import { useState } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeScreen({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => onOpen(), 1100);
  };

  return (
    <div className={`env-screen ${opening ? "env-screen--fade" : ""}`}>
      <div className="env-bg" />
      <div className="env-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="env-particle" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      <div className={`env-wrapper ${opening ? "env-wrapper--open" : ""}`}>
        {/* Envelope */}
        <div className="env-envelope">
          <div className="env-flap env-flap--back" />
          <div className="env-body">
            <div className="env-seal">♥</div>
          </div>
          <div className={`env-flap env-flap--top ${opening ? "env-flap--opened" : ""}`} />
          <div className="env-flap env-flap--left" />
          <div className="env-flap env-flap--right" />
        </div>

        {/* Card inside envelope */}
        <div className={`env-card ${opening ? "env-card--rise" : ""}`}>
          <div className="env-card-heart">♥</div>
          <p className="env-card-sub">Вы приглашены на свадьбу</p>
          <h1 className="env-card-names">Денис<span> & </span>Анастасия</h1>
          <p className="env-card-date">08 · 07 · 2026</p>
        </div>

        {/* Text & button below envelope */}
        <p className="env-tagline">
          Вы получили это приглашение не случайно — в самый важный день нашей жизни
          мы хотим видеть именно вас рядом. ♡
        </p>

        <button className="env-btn" onClick={handleOpen}>
          <span className="env-btn-icon">✉</span>
          Открыть
        </button>
      </div>
    </div>
  );
}
