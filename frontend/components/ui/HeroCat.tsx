// components/HeroCat.tsx
// Drop this file in your components folder and import it in page.tsx

const catStyles = `
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
  @keyframes tailWag { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
  @keyframes earTwitch { 0%,90%,100%{transform:rotate(0deg)} 93%{transform:rotate(-8deg)} 96%{transform:rotate(5deg)} }
  @keyframes blink { 0%,90%,100%{transform:scaleY(1)} 93%{transform:scaleY(0.08)} }
  @keyframes pawPat { 0%,60%,100%{transform:rotate(0deg) translateY(0)} 70%{transform:rotate(-10deg) translateY(-6px)} 80%{transform:rotate(5deg) translateY(2px)} }
  @keyframes sparkle { 0%,100%{opacity:0;transform:scale(0.5) rotate(0deg)} 50%{opacity:1;transform:scale(1.2) rotate(180deg)} }
  @keyframes wiggle { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
  .cat-float{animation:float 4s ease-in-out infinite}
  .cat-tail{animation:tailWag 1.6s ease-in-out infinite;transform-origin:top center}
  .cat-ear{animation:earTwitch 4s ease-in-out infinite;transform-origin:bottom center}
  .cat-eye{animation:blink 5s ease-in-out infinite;transform-origin:center}
  .cat-paw{animation:pawPat 3s ease-in-out infinite;transform-origin:top right}
  .sparkle-1{animation:sparkle 2.2s ease-in-out .3s infinite}
  .sparkle-2{animation:sparkle 2.8s ease-in-out 1.1s infinite}
  .sparkle-3{animation:sparkle 2s ease-in-out .7s infinite}
  .wiggle-loop{animation:wiggle 3s ease-in-out infinite}
`;

function CatSVG() {
  const whiskers: [string,string,string,string][] = [
    ["55","120","88","123"],["55","126","88","126"],["55","132","88","129"],
    ["112","123","145","120"],["112","126","145","126"],["112","129","145","132"],
  ];
  return (
    <svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%", overflow:"visible" }}>
      <g className="cat-tail" style={{ transformOrigin:"100px 200px" }}>
        <path d="M 100 200 Q 155 185 165 155 Q 175 128 155 118" stroke="#c8785a" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 100 200 Q 155 185 165 155 Q 175 128 155 118" stroke="#e8a080" strokeWidth="7" fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx="100" cy="175" rx="52" ry="45" fill="#d4896a" />
      <ellipse cx="100" cy="178" rx="30" ry="28" fill="#f2c4a8" />
      <g className="cat-paw">
        <ellipse cx="68" cy="215" rx="14" ry="9" fill="#c8785a" />
        <ellipse cx="68" cy="213" rx="10" ry="6" fill="#e8a080" />
      </g>
      <ellipse cx="132" cy="215" rx="14" ry="9" fill="#c8785a" />
      <ellipse cx="132" cy="213" rx="10" ry="6" fill="#e8a080" />
      <ellipse cx="100" cy="115" rx="48" ry="44" fill="#d4896a" />
      <g className="cat-ear" style={{ transformOrigin:"72px 82px" }}>
        <polygon points="58,88 72,62 88,88" fill="#c8785a" />
        <polygon points="63,88 72,68 83,88" fill="#e8a0a0" />
      </g>
      <g className="cat-ear" style={{ transformOrigin:"128px 82px", animationDelay:"0.3s" }}>
        <polygon points="112,88 128,62 142,88" fill="#c8785a" />
        <polygon points="117,88 128,68 137,88" fill="#e8a0a0" />
      </g>
      <ellipse cx="100" cy="120" rx="32" ry="28" fill="#f2c4a8" />
      <g className="cat-eye">
        <ellipse cx="85" cy="112" rx="8" ry="9" fill="#2a1a0a" /><ellipse cx="115" cy="112" rx="8" ry="9" fill="#2a1a0a" />
        <ellipse cx="88" cy="109" rx="3" ry="3" fill="white" /><ellipse cx="118" cy="109" rx="3" ry="3" fill="white" />
        <ellipse cx="85" cy="113" rx="5" ry="6" fill="#4a8a3a" /><ellipse cx="115" cy="113" rx="5" ry="6" fill="#4a8a3a" />
        <ellipse cx="85" cy="113" rx="3" ry="4" fill="#1a0a02" /><ellipse cx="115" cy="113" rx="3" ry="4" fill="#1a0a02" />
        <ellipse cx="87" cy="111" rx="1.5" ry="1.5" fill="white" /><ellipse cx="117" cy="111" rx="1.5" ry="1.5" fill="white" />
      </g>
      <polygon points="100,122 96,127 104,127" fill="#e06080" />
      <path d="M96,127 Q100,132 104,127" stroke="#c04060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M96,127 Q93,130 90,128" stroke="#c04060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M104,127 Q107,130 110,128" stroke="#c04060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="76" cy="125" rx="9" ry="5" fill="#e88888" opacity="0.45" />
      <ellipse cx="124" cy="125" rx="9" ry="5" fill="#e88888" opacity="0.45" />
      {whiskers.map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8a5a3a" strokeWidth="1.2" opacity="0.7" />)}
      <g className="wiggle-loop" style={{ transformOrigin:"100px 68px" }}>
        <path d="M100,72 C100,72 94,65 94,62 C94,59 97,57 100,60 C103,57 106,59 106,62 C106,65 100,72 100,72Z" fill="#e04070" opacity="0.9" />
      </g>
    </svg>
  );
}

function Sparkles() {
  const s = [
    { cls:"sparkle-1", col:"text-rose-300", sz:"text-2xl", style:{ top:"10%", right:"5%" } },
    { cls:"sparkle-2", col:"text-amber-300", sz:"text-lg",  style:{ top:"35%", right:"2%" } },
    { cls:"sparkle-3", col:"text-rose-400",  sz:"text-base",style:{ bottom:"15%", right:"10%" } },
    { cls:"sparkle-2", col:"text-amber-300", sz:"text-2xl", style:{ top:"12%", left:"5%" } },
    { cls:"sparkle-3", col:"text-rose-300",  sz:"text-base",style:{ top:"40%", left:"2%" } },
    { cls:"sparkle-1", col:"text-rose-400",  sz:"text-lg",  style:{ bottom:"18%", left:"8%" } },
  ];
  return <>{s.map((x,i) => <span key={i} className={`${x.cls} absolute ${x.col} ${x.sz} select-none pointer-events-none`} style={x.style}>✦</span>)}</>;
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function HeroCat() {
  return (
    <>
      <style>{catStyles}</style>
      <div className="relative z-10 flex items-center justify-center w-full md:w-1/2 md:-mr-8">
        <Sparkles />
        <div className="cat-float" style={{ width:"clamp(200px,30vw,380px)", height:"clamp(220px,34vw,430px)" }}>
          <CatSVG />
        </div>
      </div>
    </>
  );
}