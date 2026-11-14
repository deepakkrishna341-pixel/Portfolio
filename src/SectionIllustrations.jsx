import "./SectionIllustrations.css";

const illustrations = {
  internship: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="105" r="75" className="illustration-orbit" />

      {/* Robot */}
      <g className="robot-character">
        <rect x="105" y="70" width="90" height="85" rx="22" className="robot-body" />
        <rect x="119" y="87" width="62" height="42" rx="13" className="robot-face" />

        <g className="robot-eyes">
          <circle cx="137" cy="108" r="5" className="robot-eye" />
          <circle cx="163" cy="108" r="5" className="robot-eye" />
        </g>

        <path d="M140 119 Q150 126 160 119" className="robot-mouth" />
        <path d="M150 70 V48" className="illustration-line" />
        <circle cx="150" cy="42" r="7" className="illustration-orange robot-antenna" />

        <path d="M105 105 H83 M195 105 H217" className="illustration-line" />
        <circle cx="76" cy="105" r="6" className="illustration-orange" />
        <circle cx="224" cy="105" r="6" className="illustration-orange" />

        <rect x="130" y="143" width="40" height="7" rx="3" className="robot-detail" />
        <path d="M112 165 L95 183 M188 165 L205 183" className="illustration-line" />
      </g>

      {/* Hiding place */}
      <rect x="65" y="165" width="170" height="35" rx="10" className="robot-hide-cover" />
      <path d="M85 165 V185 M215 165 V185" className="hide-cover-detail" />

      <circle cx="95" cy="183" r="4" className="illustration-orange" />
      <circle cx="205" cy="183" r="4" className="illustration-orange" />
    </svg>
  ),

  ai: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="105" r="78" className="illustration-orbit" />

      <g className="robot-character">
        <rect x="91" y="67" width="118" height="100" rx="28" className="robot-body" />
        <rect x="108" y="86" width="84" height="49" rx="15" className="robot-face" />

        <g className="robot-eyes">
          <circle cx="132" cy="110" r="7" className="robot-eye" />
          <circle cx="168" cy="110" r="7" className="robot-eye" />
        </g>

        <path d="M137 126 Q150 135 163 126" className="robot-mouth" />
        <path d="M150 67 V48" className="illustration-line" />
        <circle cx="150" cy="40" r="8" className="illustration-orange robot-antenna" />

        <path d="M91 110 H72 M209 110 H228" className="illustration-line" />
        <circle cx="65" cy="110" r="6" className="illustration-orange" />
        <circle cx="235" cy="110" r="6" className="illustration-orange" />

        <path d="M112 171 L99 190 M188 171 L201 190" className="illustration-line" />
      </g>

      <path d="M75 55 L82 48 L89 55 L82 62 Z" className="illustration-orange" />
      <path d="M215 55 L222 48 L229 55 L222 62 Z" className="illustration-orange" />

      <rect x="65" y="165" width="170" height="35" rx="10" className="robot-hide-cover" />
    </svg>
  ),

  coding: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="105" r="80" className="illustration-orbit" />

      <g className="coding-device">
        <rect x="65" y="45" width="170" height="115" rx="12" className="robot-body" />
        <rect x="76" y="56" width="148" height="93" rx="5" className="coding-screen" />

        <g className="code-lines">
          <path d="M94 78 H145" />
          <path d="M94 94 H180" />
          <path d="M110 110 H165" />
          <path d="M94 126 H150" />
        </g>

        <rect x="151" y="119" width="3" height="12" className="coding-cursor" />

        <path d="M50 174 H250 L235 160 H65 Z" className="laptop-base" />
        <path d="M120 166 H180" className="illustration-line" />
      </g>

      <circle cx="55" cy="65" r="5" className="illustration-orange" />
      <circle cx="245" cy="145" r="5" className="illustration-orange" />
    </svg>
  ),

  security: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="110" r="80" className="illustration-orbit" />

      <g className="security-shield">
        <path d="M150 38 L213 63 V111 C213 151 187 178 150 193 C113 178 87 151 87 111 V63 Z" className="shield-shape" />

        <rect x="125" y="99" width="50" height="43" rx="8" className="lock-body" />
        <path d="M136 99 V85 C136 66 164 66 164 85 V99" className="illustration-line" />

        <circle cx="150" cy="119" r="5" className="illustration-orange" />
        <path d="M150 124 V132" className="illustration-line" />
      </g>

      <circle cx="150" cy="110" r="58" className="security-radar" />

      <path d="M64 70 L74 60 L84 70 L74 80 Z" className="illustration-orange" />
      <path d="M216 153 L226 143 L236 153 L226 163 Z" className="illustration-orange" />
    </svg>
  ),

  cloud: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <g className="cloud-floating">
        <path d="M87 135 C48 135 48 80 91 77 C104 35 168 35 181 78 C226 67 246 133 205 145 H91 Z" className="cloud-shape" />
      </g>

      <g className="server-group">
        <rect x="105" y="112" width="90" height="65" rx="9" className="server-body" />
        <path d="M120 130 H180 M120 150 H180" className="illustration-line" />

        <circle cx="127" cy="130" r="4" className="server-light light-one" />
        <circle cx="127" cy="150" r="4" className="server-light light-two" />
      </g>

      <path d="M150 177 V195 M130 195 H170" className="illustration-line" />

      <circle cx="75" cy="160" r="5" className="illustration-orange cloud-particle" />
      <circle cx="225" cy="160" r="5" className="illustration-orange cloud-particle" />
    </svg>
  ),

  vr: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="110" r="78" className="illustration-orbit" />

      <g className="vr-device">
        <path d="M70 91 Q150 58 230 91 L216 151 Q212 165 196 160 L175 145 H125 L104 160 Q88 165 84 151 Z" className="vr-headset" />

        <rect x="91" y="97" width="48" height="39" rx="12" className="vr-lens" />
        <rect x="161" y="97" width="48" height="39" rx="12" className="vr-lens" />

        <path d="M139 117 H161" className="illustration-line" />
        <circle cx="115" cy="116" r="8" className="illustration-orange" />
        <circle cx="185" cy="116" r="8" className="illustration-orange" />
      </g>

      <path d="M150 54 V36 M143 43 L150 36 L157 43" className="illustration-line" />
      <circle cx="150" cy="29" r="5" className="illustration-orange" />
    </svg>
  ),

  pilot: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="110" r="82" className="illustration-orbit" />

      {/* Moving aircraft */}
      <g className="plane-flight">
        <path d="M150 42 L163 104 L224 130 L224 144 L163 130 L158 175 L180 190 L180 199 L150 187 L120 199 L120 190 L142 175 L137 130 L76 144 L76 130 L137 104 Z" className="plane-shape" />
        <path d="M150 42 L150 187" className="plane-detail" />
      </g>

      <circle cx="45" cy="110" r="5" className="illustration-orange" />
      <circle cx="255" cy="110" r="5" className="illustration-orange" />

      <path d="M75 62 L82 55 L89 62 L82 69 Z" className="illustration-orange" />
      <path d="M211 62 L218 55 L225 62 L218 69 Z" className="illustration-orange" />
    </svg>
  ),

  analytics: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="110" r="80" className="illustration-orbit" />

      <path d="M70 170 H235" className="illustration-line" />

      <g className="analytics-bars">
        <rect x="85" y="125" width="25" height="45" rx="5" className="analytics-bar bar-one" />
        <rect x="130" y="95" width="25" height="75" rx="5" className="analytics-bar bar-two" />
        <rect x="175" y="65" width="25" height="105" rx="5" className="analytics-bar bar-three" />
      </g>

      <path d="M82 105 L137 75 L182 55 L220 40" className="analytics-line" />
      <circle cx="220" cy="40" r="6" className="illustration-orange" />
    </svg>
  ),

  event: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <rect x="75" y="48" width="150" height="135" rx="15" className="calendar-body" />
      <path d="M75 85 H225" className="illustration-line" />
      <path d="M112 39 V61 M188 39 V61" className="illustration-line" />

      <rect x="99" y="103" width="22" height="20" rx="4" className="calendar-dot" />
      <rect x="139" y="103" width="22" height="20" rx="4" className="illustration-orange" />
      <rect x="179" y="103" width="22" height="20" rx="4" className="calendar-dot" />

      <rect x="99" y="140" width="22" height="20" rx="4" className="calendar-dot" />
      <rect x="139" y="140" width="22" height="20" rx="4" className="calendar-dot" />

      <path d="M205 45 L220 30 L235 45 L220 60 Z" className="illustration-orange" />
    </svg>
  ),

  travel: (
    <svg viewBox="0 0 300 220" className="illustration-svg">
      <circle cx="150" cy="108" r="77" className="illustration-orbit" />

      <path d="M80 155 L112 85 L150 58 L188 85 L220 155 Z" className="mountain-shape" />
      <path d="M112 85 L137 108 L150 58" className="mountain-detail" />
      <path d="M188 85 L163 108 L150 58" className="mountain-detail" />

      <path d="M150 58 C138 58 130 68 130 80 C130 99 150 117 150 117 C150 117 170 99 170 80 C170 68 162 58 150 58 Z" className="map-pin" />
      <circle cx="150" cy="80" r="6" className="illustration-orange" />

      <path d="M85 175 Q150 195 215 175" className="illustration-line" />
      <circle cx="85" cy="175" r="5" className="illustration-orange" />
      <circle cx="215" cy="175" r="5" className="illustration-orange" />
    </svg>
  ),
};

export default function SectionIllustration({ type, title, description }) {
  return (
    <article className={`section-illustration illustration-${type}`}>
      <div className="illustration-visual">
        <span className="illustration-number">DK / TECH</span>
        <div className="illustration-glow" />
        {illustrations[type] || illustrations.ai}
      </div>

      <div className="illustration-caption">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}