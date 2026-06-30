// Ondas geométricas estilo Tresmares — paths começam acima do viewBox, preenchem tudo
export default function TremWaves({ style = {} }) {
  return (
    <svg
      viewBox="0 0 1440 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    >
      {/* Camada mais atrás — tom mais escuro, crista acima do viewBox */}
      <path
        d="M-200 -80 C200 -200 500 -140 800 -190 C1050 -230 1300 -160 1640 -200 L1640 600 L-200 600 Z"
        fill="#B8B8B2"
      />
      <path
        d="M-200 -20 C180 -150 480 -90 780 -140 C1030 -180 1280 -110 1640 -150 L1640 600 L-200 600 Z"
        fill="#C0C0BA"
      />
      <path
        d="M-200 40 C180 -100 480 -35 780 -85 C1030 -125 1280 -55 1640 -95 L1640 600 L-200 600 Z"
        fill="#CACACC"
      />
      <path
        d="M-200 100 C180 -40 480 20 780 -30 C1030 -70 1280 0 1640 -40 L1640 600 L-200 600 Z"
        fill="#D2D2CE"
      />
      <path
        d="M-200 160 C180 20 480 80 780 30 C1030 -10 1280 60 1640 20 L1640 600 L-200 600 Z"
        fill="#DCDCD8"
      />
      {/* Camada frente — mais clara */}
      <path
        d="M-200 220 C180 80 480 140 780 90 C1030 50 1280 120 1640 80 L1640 600 L-200 600 Z"
        fill="#E4E4E0"
      />

      {/* Linhas topográficas de contorno — acima das hills */}
      {[-120, -105, -90, -75, -60, -45, -30, -15, 0, 15].map((baseY, i) => (
        <path
          key={i}
          d={`M-200 ${baseY} C200 ${baseY - 120} 500 ${baseY - 60} 800 ${baseY - 110} C1050 ${baseY - 150} 1300 ${baseY - 80} 1640 ${baseY - 120}`}
          fill="none"
          stroke="#9A9A94"
          strokeWidth={Math.max(0.3, 0.8 - i * 0.05)}
          opacity={Math.max(0.08, 0.7 - i * 0.06)}
        />
      ))}
    </svg>
  )
}
