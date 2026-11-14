import { useEffect, useRef } from "react";

/* =========================================
   CINEMATIC CODE BACKGROUND
   - tilted 3D code plane (perspective + depth blur) that keeps scrolling
   - glowing cyan + red polygon networks
   - dotted world map with scanning light and data markers
   - drifting bokeh lights and a lens flare
   Everything is drawn on one canvas.
========================================= */

const CODE = `import bpy
from mathutils import Vector

class MirrorOperator(bpy.types.Operator):
    """Mirror the selected object"""
    bl_idname = "object.mirror_x"
    bl_label = "Mirror X"

    def execute(self, context):
        obj = context.active_object
        mod = obj.modifiers.new("Mirror", "MIRROR")
        mod.use_axis[0] = True
        mod.use_axis[1] = False
        mod.use_axis[2] = False
        mod.mirror_object = obj
        # selection at the end
        obj.select_set(True)
        print("please select exactly two objects")
        return {"FINISHED"}

    @classmethod
    def poll(cls, context):
        return context.active_object is not None

async function loadPortfolio() {
  const res = await fetch("/api/projects");
  const data = await res.json();
  return data.filter((p) => p.featured);
}

class EventManager extends Controller {
  public function store(Request $request) {
    $event = Event::create($request->all());
    return redirect('/events');
  }
}

SELECT title, COUNT(id) AS total
FROM registrations
GROUP BY event_id ORDER BY total DESC;

const [open, setOpen] = useState(false);
useEffect(() => { document.title = "Deepak"; }, []);
int main() { int i, sum = 0; for (i = 0; i < 10; i++) sum += i; }
`;

const KEYWORDS = new Set([
  "import", "from", "class", "def", "return", "if", "else", "for", "async",
  "function", "const", "let", "await", "public", "extends", "new", "int",
  "SELECT", "FROM", "GROUP", "BY", "ORDER", "AS", "COUNT", "DESC", "is", "not",
  "True", "False", "None", "true", "false",
]);

/* palette taken from the reference: cyan code, white identifiers, amber accents */
const C = {
  keyword: "#3ee6ff",
  string: "#ffb13b",
  comment: "#2f8fb0",
  number: "#ff9f2e",
  fn: "#9df3ff",
  plain: "#d6f7ff",
  punct: "#4cc3e6",
  amber: "#ffa83a",
};

function tokenize(line) {
  const out = [];
  const re =
    /(\/\/.*|#.*)|("""[^"]*"""|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\d+(?:\.\d+)?)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|(\s+)|(\S)/g;
  let m;
  while ((m = re.exec(line))) {
    if (m[1]) out.push([m[1], C.comment]);
    else if (m[2]) out.push([m[2], C.string]);
    else if (m[3]) out.push([m[3], C.number]);
    else if (m[4]) out.push([m[4], KEYWORDS.has(m[4]) ? C.keyword : C.fn]);
    else if (m[5]) out.push([m[5], KEYWORDS.has(m[5]) ? C.keyword : C.plain]);
    else if (m[6]) out.push([m[6], C.plain]);
    else out.push([m[7], C.punct]);
  }
  return out;
}

/* Rough continents as ellipses in a 2:1 box, used to place the dotted map. */
const LAND = [
  [0.2, 0.3, 0.14, 0.17], [0.3, 0.14, 0.05, 0.06], [0.29, 0.66, 0.065, 0.2],
  [0.5, 0.26, 0.06, 0.08], [0.52, 0.56, 0.085, 0.2], [0.72, 0.3, 0.19, 0.17],
  [0.68, 0.5, 0.035, 0.08], [0.83, 0.52, 0.05, 0.05], [0.87, 0.76, 0.07, 0.06],
];

const hash = (a, b) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function makeCodeSources(lineH, font, dpr) {
  const all = CODE.split("\n");
  const cv = document.createElement("canvas");
  const probe = cv.getContext("2d");
  probe.font = font;
  const charW = probe.measureText("M").width;
  const width = Math.ceil(72 * charW);
  const cycleLines = all.length;
  const cycle = cycleLines * lineH;
  const height = cycle * 2;

  function draw(glow, amberBoost) {
    const c = document.createElement("canvas");
    c.width = Math.ceil(width * dpr);
    c.height = Math.ceil(height * dpr);
    const g = c.getContext("2d");
    g.scale(dpr, dpr);
    g.font = font;
    g.textBaseline = "middle";
    for (let i = 0; i < cycleLines * 2; i++) {
      const line = all[i % cycleLines];
      const y = i * lineH + lineH / 2;
      const amberLine = /print|select|SELECT|FROM|GROUP|mirror_object/.test(line);
      let x = charW * 2;
      for (const [text, color] of tokenize(line)) {
        g.fillStyle = amberLine && amberBoost ? C.amber : color;
        if (glow) {
          g.shadowColor = amberLine && amberBoost ? "rgba(255,150,40,.9)" : "rgba(40,220,255,.85)";
          g.shadowBlur = 8;
        }
        g.fillText(text, x, y);
        x += text.length * charW;
      }
    }
    return c;
  }

  const sharp = draw(true, false);
  const amber = draw(true, true);

  const blurred = document.createElement("canvas");
  blurred.width = sharp.width;
  blurred.height = sharp.height;
  const bg = blurred.getContext("2d");
  bg.filter = `blur(${Math.round(5 * dpr)}px)`;
  bg.drawImage(amber, 0, 0);
  bg.filter = "none";

  return { sharp, blurred, width, height, cycle };
}

export default function CodeBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    let src = null;
    let nodes = [];
    let bokeh = [];
    let markers = [];
    let dots = [];
    let scroll = 0;
    let raf = 0;
    let last = 0;
    let running = false;
    let disposed = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const mobile = () => w < 760;

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const fs = mobile() ? 12 : 15;
      src = makeCodeSources(Math.round(fs * 1.65), `${fs}px "JetBrains Mono","Fira Code",Consolas,"Courier New",monospace`, dpr);

      /* network nodes: [cyan group lower-right, red group far right, small left group] */
      const make = (n, x0, y0, x1, y1, kind) =>
        Array.from({ length: n }, () => ({
          x: x0 + Math.random() * (x1 - x0),
          y: y0 + Math.random() * (y1 - y0),
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.5) * 16,
          box: [x0, y0, x1, y1],
          kind,
        }));
      const k = mobile() ? 0.6 : 1;
      nodes = [
        ...make(Math.round(26 * k), w * 0.3, h * 0.45, w * 0.88, h * 1.0, "cyan"),
        ...make(Math.round(15 * k), w * 0.66, h * 0.52, w * 1.02, h * 1.0, "red"),
        ...make(Math.round(9 * k), 0, h * 0.18, w * 0.3, h * 0.72, "cyan"),
      ];

      const cols = [
        [0, 229, 255], [0, 229, 255], [30, 144, 255], [255, 60, 90],
        [255, 170, 60], [255, 255, 255], [0, 229, 255], [255, 60, 90],
      ];
      bokeh = Array.from({ length: mobile() ? 10 : 22 }, (_, i) => ({
        x: w * (0.35 + Math.random() * 0.68),
        y: Math.random() * h,
        r: 8 + Math.random() * 46,
        vx: (Math.random() - 0.5) * 9,
        vy: -2 - Math.random() * 7,
        c: cols[i % cols.length],
        a: 0.1 + Math.random() * 0.24,
        p: Math.random() * 6.28,
      }));

      /* dotted world map */
      const mw = w * (mobile() ? 0.95 : 0.64);
      const mh = mw * 0.5;
      const mx = w - mw - w * 0.02;
      const my = h * 0.12;
      const step = Math.max(8, Math.round(mw / 78));
      dots = [];
      for (let gx = 0; gx < mw; gx += step) {
        for (let gy = 0; gy < mh; gy += step) {
          const u = gx / mw;
          const v = gy / mh;
          const land = LAND.some(([cx, cy, rx, ry]) => {
            const d = ((u - cx) / rx) ** 2 + ((v - cy) / ry) ** 2;
            return d + (hash(gx, gy) - 0.5) * 0.35 < 1;
          });
          if (land) dots.push({ x: mx + gx, y: my + gy + (gx / mw) * 0, u, r: step * 0.26 });
        }
      }
      markers = Array.from({ length: 9 }, () => ({
        x: mx + mw * (0.15 + Math.random() * 0.75),
        y: my + mh * (0.15 + Math.random() * 0.7),
        len: 80 + Math.random() * 190,
        red: Math.random() > 0.45,
        p: Math.random() * 6.28,
      }));
    }

    /* ---------- drawing helpers ---------- */

    function drawBase(t) {
      const g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, "#020716");
      g.addColorStop(0.35, "#031225");
      g.addColorStop(1, "#04283a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      const pulse = 0.9 + 0.1 * Math.sin(t / 2600);
      const glow = (x, y, r, rgb, a) => {
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, `rgba(${rgb},${a})`);
        rg.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = rg;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      };
      glow(w * 0.88, h * 0.18, w * 0.5, "0,225,255", 0.5 * pulse);
      glow(w * 0.7, h * 0.95, w * 0.42, "0,130,255", 0.26);
      glow(w * 0.98, h * 0.7, w * 0.3, "255,40,90", 0.1);
      ctx.globalCompositeOperation = "source-over";
    }

    function drawMap(t) {
      const sweep = ((t / 5200) % 1.4) - 0.2;
      for (const d of dots) {
        const near = Math.max(0, 1 - Math.abs(d.u - sweep) * 6);
        const tw = 0.55 + 0.45 * Math.sin(t / 1300 + d.x * 0.05 + d.y * 0.03);
        ctx.globalAlpha = Math.min(1, 0.4 * tw + near * 0.6);
        ctx.fillStyle = near > 0.35 ? "#d9fdff" : "#4fe9ff";
        ctx.beginPath();
        ctx.arc(d.x + mouse.x * 8, d.y + mouse.y * 8, d.r + near * 1.1, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (const m of markers) {
        const a = 0.35 + 0.35 * Math.sin(t / 900 + m.p);
        const col = m.red ? "255,70,100" : "120,245,255";
        ctx.strokeStyle = `rgba(${col},${a * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x, m.y + m.len);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 5 + a * 3, 0, 6.283);
        ctx.strokeStyle = `rgba(${col},${a + 0.25})`;
        ctx.stroke();
        ctx.fillStyle = `rgba(${col},${a})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, 6.283);
        ctx.fill();
      }
    }

    /* tilted code plane: drawn as thin vertical strips scaled by depth */
    function drawCode() {
      const planeW = mobile() ? w * 0.98 : Math.min(w * 0.52, 820);
      const strip = 3;
      const n = Math.ceil(planeW / strip);
      const sw = src.width / n;
      const viewSrcH = Math.min(h, src.cycle) * 0.92;
      const cy = h * 0.5;
      const px = -10 + mouse.x * 12;
      const sy = scroll % src.cycle;

      /* cumulative x so the near (left) side is wider than the far (right) side */
      let total = 0;
      const widths = [];
      for (let i = 0; i < n; i++) {
        const t = i / n;
        const wgt = 1.5 - t * 1.0;
        widths.push(wgt);
        total += wgt;
      }
      let x = px;
      for (let i = 0; i < n; i++) {
        const t = i / n;
        const dw = (widths[i] / total) * planeW;
        const s = 1.45 - t * 0.95;
        const dh = viewSrcH * s;
        const dy = cy - dh / 2 + (t - 0.15) * h * 0.1 + mouse.y * 10;
        const fade = Math.min(1, (1 - t) * 3.2) * Math.min(1, 0.35 + t * 4);
        const blurAmt = Math.max(0, 1 - t / 0.45);

        if (blurAmt > 0.02) {
          ctx.globalAlpha = 0.85 * fade * blurAmt;
          ctx.drawImage(src.blurred, i * sw * dpr, sy * dpr, sw * dpr, viewSrcH * dpr, x, dy, dw + 0.6, dh);
        }
        ctx.globalAlpha = 0.95 * fade * (1 - blurAmt * 0.85);
        ctx.drawImage(src.sharp, i * sw * dpr, sy * dpr, sw * dpr, viewSrcH * dpr, x, dy, dw + 0.6, dh);
        x += dw;
      }
      ctx.globalAlpha = 1;
    }

    function drawNetwork(dt) {
      for (const p of nodes) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const [x0, y0, x1, y1] = p.box;
        if (p.x < x0 || p.x > x1) p.vx *= -1;
        if (p.y < y0 || p.y > y1) p.vy *= -1;
      }
      const maxD = mobile() ? 130 : 190;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const rgb = a.kind === "red" ? "255,60,95" : "60,255,235";
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.kind !== a.kind) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > maxD) continue;
          const f = 1 - d / maxD;
          ctx.strokeStyle = `rgba(${rgb},${0.65 * f})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          for (let k = j + 1; k < nodes.length; k++) {
            const c = nodes[k];
            if (c.kind !== a.kind) continue;
            if (Math.hypot(a.x - c.x, a.y - c.y) > maxD || Math.hypot(b.x - c.x, b.y - c.y) > maxD) continue;
            ctx.fillStyle = `rgba(${rgb},${0.07 * f})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.lineTo(c.x, c.y);
            ctx.fill();
          }
        }
      }
      for (const p of nodes) {
        const rgb = p.kind === "red" ? "255,90,120" : "120,255,240";
        ctx.fillStyle = `rgba(${rgb},.95)`;
        ctx.shadowColor = `rgba(${rgb},1)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, 6.283);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function drawBokeh(t, dt) {
      ctx.globalCompositeOperation = "lighter";
      for (const b of bokeh) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.y < -b.r) {
          b.y = h + b.r;
          b.x = w * (0.35 + Math.random() * 0.68);
        }
        const a = b.a * (0.7 + 0.3 * Math.sin(t / 1700 + b.p));
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(${b.c},${a})`);
        g.addColorStop(0.75, `rgba(${b.c},${a * 0.55})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 6.283);
        ctx.fill();
      }

      /* lens flare, top-left */
      const fx = w * 0.17 + mouse.x * 20;
      const fa = 0.8 + 0.2 * Math.sin(t / 1400);
      let g = ctx.createRadialGradient(fx, 0, 0, fx, 0, 150);
      g.addColorStop(0, `rgba(255,190,90,${0.95 * fa})`);
      g.addColorStop(0.25, `rgba(255,140,40,${0.4 * fa})`);
      g.addColorStop(1, "rgba(255,120,30,0)");
      ctx.fillStyle = g;
      ctx.fillRect(fx - 150, 0, 300, 150);
      ctx.fillStyle = `rgba(255,200,120,${0.28 * fa})`;
      ctx.fillRect(fx - 190, -2, 380, 3);
      ctx.globalCompositeOperation = "source-over";
    }

    function frame(t, dt) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      scroll += 26 * dt;

      drawBase(t);
      drawMap(t);
      drawNetwork(dt);
      drawBokeh(t, dt);
      drawCode();
    }

    function loop(now) {
      if (!running) return;
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      frame(now, dt);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      last = 0;
      if (reduceMotion) {
        running = false;
        frame(0, 0);
        return;
      }
      running = true;
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!disposed) {
        start();
      }
    };
    const onMove = (e) => {
      mouse.tx = e.clientX / w - 0.5;
      mouse.ty = e.clientY / h - 0.5;
    };
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (disposed) return;
        build();
        start();
      }, 200);
    };

    (document.fonts?.ready ?? Promise.resolve()).finally(() => {
      if (disposed) return;
      build();
      start();
    });

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="code-canvas" aria-hidden="true" />;
}
