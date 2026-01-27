"use client"

export const IslamicBorderPattern = ({ animate = false }: { animate?: boolean }) => (
  <svg className="w-full h-4" viewBox="0 0 400 20" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="border-pattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
        <g fill="currentColor" opacity="0.6">
          <polygon points="20,2 25,7 25,13 20,18 15,13 15,7" className={animate ? "animate-pulse" : ""} />
          <circle cx="10" cy="10" r="1.5" className={animate ? "animate-bounce" : ""} />
          <circle cx="30" cy="10" r="1.5" className={animate ? "animate-bounce" : ""} />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#border-pattern)" />
  </svg>
)

export const IslamicCornerPattern = ({ animate = false }: { animate?: boolean }) => (
  <svg className="absolute top-0 right-0 w-32 h-32 opacity-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" className={animate ? "animate-spin-slow" : ""}>
      <path d="M50,10 L60,20 L70,10 L80,20 L90,10 L90,20 L80,30 L90,40 L80,50 L90,60 L80,70 L90,80 L90,90 L80,90 L70,80 L60,90 L50,80 L40,90 L30,80 L20,90 L10,80 L10,90 L10,80 L20,70 L10,60 L20,50 L10,40 L20,30 L10,20 L10,10 L20,10 L30,20 L40,10 Z" />
      <circle
        cx="50"
        cy="50"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={animate ? "animate-pulse" : ""}
      />
      <polygon points="50,35 55,45 45,45" className={animate ? "animate-bounce" : ""} />
      <polygon points="50,65 45,55 55,55" className={animate ? "animate-bounce" : ""} />
      <polygon points="35,50 45,45 45,55" className={animate ? "animate-bounce" : ""} />
      <polygon points="65,50 55,55 55,45" className={animate ? "animate-bounce" : ""} />
    </g>
  </svg>
)

export const IslamicCardPattern = ({ animate = false }: { animate?: boolean }) => (
  <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="card-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="currentColor" strokeWidth="0.5">
          <polygon points="15,3 21,9 21,21 15,27 9,21 9,9" className={animate ? "animate-pulse" : ""} />
          <polygon points="15,7 18,10 18,20 15,23 12,20 12,10" className={animate ? "animate-spin-slow" : ""} />
          <circle cx="15" cy="15" r="2" className={animate ? "animate-ping" : ""} />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#card-pattern)" />
  </svg>
)

// Advanced 3D Islamic Patterns
export const Islamic3DStarPattern = ({
  animate = false,
  intensity = 0.5,
}: { animate?: boolean; intensity?: number }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity: intensity * 0.1 }}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="shadow3d">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
      </linearGradient>
      <pattern id="islamic-3d-star" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <g fill="url(#starGradient)" filter="url(#shadow3d)">
          <polygon
            points="25,5 30,15 40,15 32,23 35,33 25,28 15,33 18,23 10,15 20,15"
            className={animate ? "animate-spin-slow transform-gpu" : ""}
            style={{ transformOrigin: "25px 25px" }}
          />
          <circle cx="25" cy="25" r="3" className={animate ? "animate-pulse" : ""} />
          <polygon points="25,10 28,18 22,18" className={animate ? "animate-bounce" : ""} />
          <polygon points="25,40 22,32 28,32" className={animate ? "animate-bounce" : ""} />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#islamic-3d-star)" />
  </svg>
)

export const Islamic3DGeometricPattern = ({
  animate = false,
  intensity = 0.5,
  variant = 1,
}: { animate?: boolean; intensity?: number; variant?: number }) => {
  const patterns = [
    // Variant 1: Interlacing Hexagons
    <pattern key="1" id={`islamic-3d-geo-${variant}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity={intensity}>
        <polygon
          points="30,5 45,15 45,35 30,45 15,35 15,15"
          className={animate ? "animate-pulse" : ""}
          filter="url(#shadow3d)"
        />
        <polygon
          points="30,15 37,22 37,32 30,39 23,32 23,22"
          className={animate ? "animate-spin-slow" : ""}
          style={{ transformOrigin: "30px 30px" }}
        />
        <circle cx="30" cy="30" r="8" className={animate ? "animate-ping" : ""} />
      </g>
    </pattern>,

    // Variant 2: Star and Cross
    <pattern key="2" id={`islamic-3d-geo-${variant}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <g fill="currentColor" opacity={intensity}>
        <path
          d="M20,2 L25,12 L35,12 L27,18 L30,28 L20,22 L10,28 L13,18 L5,12 L15,12 Z"
          className={animate ? "animate-spin-slow" : ""}
          style={{ transformOrigin: "20px 20px" }}
          filter="url(#shadow3d)"
        />
        <rect x="18" y="18" width="4" height="4" className={animate ? "animate-pulse" : ""} />
      </g>
    </pattern>,

    // Variant 3: Islamic Knot
    <pattern key="3" id={`islamic-3d-geo-${variant}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="currentColor" strokeWidth="2" opacity={intensity}>
        <path
          d="M20,20 Q40,10 60,20 Q70,40 60,60 Q40,70 20,60 Q10,40 20,20"
          className={animate ? "animate-pulse" : ""}
          filter="url(#shadow3d)"
        />
        <path
          d="M60,20 Q70,40 60,60 Q40,70 20,60 Q10,40 20,20 Q40,10 60,20"
          className={animate ? "animate-spin-slow" : ""}
          style={{ transformOrigin: "40px 40px" }}
        />
        <circle cx="40" cy="40" r="12" className={animate ? "animate-bounce" : ""} />
      </g>
    </pattern>,
  ]

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow3d">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        {patterns[variant - 1]}
      </defs>
      <rect width="100%" height="100%" fill={`url(#islamic-3d-geo-${variant})`} />
    </svg>
  )
}

// Arabic Calligraphy Components
export const ArabicCalligraphy = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`font-arabic text-4xl opacity-10 absolute select-none pointer-events-none ${className}`}>
    <span className="bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">{text}</span>
  </div>
)

export const CalligraphyBorder = ({ animate = false }: { animate?: boolean }) => (
  <div className={`absolute inset-0 border-2 border-amber-200 ${animate ? "animate-pulse" : ""}`}>
    <div className="absolute -top-4 left-4 bg-white px-2">
      <ArabicCalligraphy text="بسم الله" className="text-lg opacity-30" />
    </div>
    <div className="absolute -bottom-4 right-4 bg-white px-2">
      <ArabicCalligraphy text="الحمد لله" className="text-lg opacity-30" />
    </div>
  </div>
)
