import React from "react";

const MineralLogo = ({ className = "w-28 h-28 mx-auto mb-6" }) => {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Camadas do solo */}
        <path
          d="M 0 100 Q 25 85 50 100 Q 75 115 100 100 L 100 80 Q 75 95 50 80 Q 25 65 0 80 Z"
          fill="#4A2C2A"
        />
        <path
          d="M 0 80 Q 25 65 50 80 Q 75 95 100 80 L 100 60 Q 75 75 50 60 Q 25 45 0 60 Z"
          fill="#7B5C4B"
        />
        <path
          d="M 0 60 Q 25 45 50 60 Q 75 75 100 60 L 100 40 Q 75 55 50 40 Q 25 25 0 40 Z"
          fill="#B5A08D"
        />

        {/* Mineral em destaque */}
        <polygon
          points="40,25 50,10 60,25 50,40"
          fill="url(#mineralGradient)"
          stroke="#C89F5D"
          strokeWidth="1.5"
        />
        <polygon
          points="50,40 40,25 30,35 30,50 50,50"
          fill="url(#mineralGradient)"
          stroke="#C89F5D"
          strokeWidth="1.5"
        />
        <polygon
          points="50,40 60,25 70,35 70,50 50,50"
          fill="url(#mineralGradient)"
          stroke="#C89F5D"
          strokeWidth="1.5"
        />

        {/* Gradiente dourado/bronze */}
        <defs>
          <linearGradient
            id="mineralGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#C89F5D" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default MineralLogo;
