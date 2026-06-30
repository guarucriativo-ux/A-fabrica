const GeoBg = ({ width = '100%', height = '100%' }) => {
  return (
    <svg
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {/* Retângulo base levemente rotacionado */}
      <rect
        x="40"
        y="60"
        width="340"
        height="220"
        rx="2"
        fill="#E4E4E0"
        fillOpacity="0.7"
        transform="rotate(-4 210 170)"
      />

      {/* Polígono diagonal sobreposto */}
      <polygon
        points="180,30 520,80 480,320 140,270"
        fill="#ECECEA"
        fillOpacity="0.6"
      />

      {/* Retângulo menor rotacionado positivo */}
      <rect
        x="300"
        y="140"
        width="220"
        height="160"
        rx="2"
        fill="#E8E8E4"
        fillOpacity="0.8"
        transform="rotate(6 410 220)"
      />

      {/* Shape de contorno apenas — sem fill */}
      <polygon
        points="60,200 260,40 480,160 380,360 80,340"
        fill="none"
        stroke="#D0D0CA"
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default GeoBg;
