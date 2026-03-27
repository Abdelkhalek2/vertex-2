"use client";

import { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    MotionValue,
} from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────
const PHRASES   = ["WE IDEATE", "WE CREATE", "WE ELEVATE"];
const N_POINTS  = 260;
const RADIUS    = 290;
const FOV       = 520;
const CONN_DIST = 76;

// ─── Fibonacci sphere distribution ───────────────────────────────────────────
type Point3 = [number, number, number];

function makeSphere(n: number, r: number): Point3[] {
    const pts: Point3[] = [];
    const g = Math.PI * (Math.sqrt(5) - 1); // golden angle
    for (let i = 0; i < n; i++) {
        const y   = 1 - (i / (n - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const t   = g * i;
        pts.push([Math.cos(t) * rad * r, y * r, Math.sin(t) * rad * r]);
    }
    return pts;
}

const SPHERE_PTS = makeSphere(N_POINTS, RADIUS);

// ─── Background particles (stars + nebula) ───────────────────────────────────
type StarParticle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; twinkle: number; twinkleSpeed: number };
type NebulaOrb   = { x: number; y: number; vx: number; vy: number; radius: number; hue: number; phase: number };

function makeStars(n: number): StarParticle[] {
    return Array.from({ length: n }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00008,
        vy: (Math.random() - 0.5) * 0.00008,
        r: 0.4 + Math.random() * 1.4,
        alpha: 0.1 + Math.random() * 0.5,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
    }));
}

function makeNebulas(): NebulaOrb[] {
    return [
        { x: 0.18, y: 0.25, vx:  0.000035, vy:  0.000020, radius: 0.38, hue: 240, phase: 0 },
        { x: 0.80, y: 0.70, vx: -0.000025, vy: -0.000015, radius: 0.32, hue: 200, phase: 1.8 },
        { x: 0.50, y: 0.88, vx:  0.000018, vy: -0.000030, radius: 0.28, hue: 260, phase: 3.5 },
    ];
}

// ─── Globe Canvas ─────────────────────────────────────────────────────────────
function GlobeCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const canvasRef  = useRef<HTMLCanvasElement>(null);
    const rafRef     = useRef<number>(0);
    const progRef    = useRef(0);
    const autoRotRef = useRef(0);
    const lastTRef   = useRef(0);
    const starsRef   = useRef<StarParticle[]>([]);
    const nebulasRef = useRef<NebulaOrb[]>([]);
    const timeRef    = useRef(0);

    useMotionValueEvent(scrollProgress, "change", (v) => { progRef.current = v; });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;

        // ── Resize ──────────────────────────────────────────────────────────
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width  = canvas.offsetWidth  * dpr;
            canvas.height = canvas.offsetHeight * dpr;
        };
        resize();
        window.addEventListener("resize", resize);

        // ── Init background particles ────────────────────────────────────────
        starsRef.current   = makeStars(90);
        nebulasRef.current = makeNebulas();

        // ── Draw loop ────────────────────────────────────────────────────────
        const draw = (now: number) => {
            const dt = Math.min((now - lastTRef.current) / 1000, 0.05);
            lastTRef.current = now;
            timeRef.current += dt;
            autoRotRef.current += dt * 0.12;

            const W  = canvas.width;
            const H  = canvas.height;
            const cx = W / 2;
            const cy = H / 2;
            const sc = Math.min(W, H) / 615;

            ctx.clearRect(0, 0, W, H);

            // ── Nebula orbs ─────────────────────────────────────────────────
            const t = timeRef.current;
            for (const orb of nebulasRef.current) {
                orb.x += orb.vx;
                orb.y += orb.vy;
                // wrap
                if (orb.x < -0.2) orb.x = 1.2;
                if (orb.x >  1.2) orb.x = -0.2;
                if (orb.y < -0.2) orb.y = 1.2;
                if (orb.y >  1.2) orb.y = -0.2;

                const pulse  = 0.85 + 0.15 * Math.sin(t * 0.4 + orb.phase);
                const ox     = orb.x * W;
                const oy     = orb.y * H;
                const oRadius= orb.radius * Math.min(W, H) * pulse;
                const ng = ctx.createRadialGradient(ox, oy, 0, ox, oy, oRadius);
                const h  = orb.hue;
                ng.addColorStop(0,   `hsla(${h},100%,60%,0.055)`);
                ng.addColorStop(0.5, `hsla(${h},100%,50%,0.025)`);
                ng.addColorStop(1,   `hsla(${h},100%,40%,0)`);
                ctx.fillStyle = ng;
                ctx.beginPath();
                ctx.arc(ox, oy, oRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── Drifting stars ──────────────────────────────────────────────
            for (const s of starsRef.current) {
                s.x += s.vx;
                s.y += s.vy;
                s.twinkle += s.twinkleSpeed * dt;
                if (s.x < 0) s.x = 1;  if (s.x > 1) s.x = 0;
                if (s.y < 0) s.y = 1;  if (s.y > 1) s.y = 0;

                const twinkledAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
                const sx = s.x * W;
                const sy = s.y * H;

                // Soft glow
                const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 3.5);
                sg.addColorStop(0, `rgba(200,240,255,${(twinkledAlpha * 0.7).toFixed(3)})`);
                sg.addColorStop(1, "rgba(200,240,255,0)");
                ctx.fillStyle = sg;
                ctx.beginPath();
                ctx.arc(sx, sy, s.r * 3.5, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = `rgba(220,245,255,${twinkledAlpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── Rotation angles (scroll + auto) ────────────────────────────
            const ry = progRef.current * Math.PI * 2.5 + autoRotRef.current;
            const rx = Math.sin(progRef.current * Math.PI * 1.2) * 0.28;

            // ── Project all points ──────────────────────────────────────────
            type Proj = { px: number; py: number; z: number };
            const pts2d: Proj[] = SPHERE_PTS.map(([x, y, z]) => {
                // Rotate around Y
                const x1 = x * Math.cos(ry) + z * Math.sin(ry);
                const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
                // Rotate around X
                const y2 = y  * Math.cos(rx) - z1 * Math.sin(rx);
                const z2 = y  * Math.sin(rx) + z1 * Math.cos(rx);
                // Perspective project
                const fsc = (FOV / (FOV + z2 + RADIUS * 0.6)) * sc;
                return { px: cx + x1 * fsc, py: cy + y2 * fsc, z: z2 };
            });

            // Sort back → front for painter's algorithm
            const sorted = pts2d
                .map((p, i) => ({ ...p, i }))
                .sort((a, b) => a.z - b.z);

            // ── Connection lines ────────────────────────────────────────────
            ctx.lineWidth = 0.55 * sc;
            for (let a = 0; a < sorted.length - 1; a++) {
                const pa = sorted[a];
                for (let b = a + 1; b < sorted.length; b++) {
                    const pb  = sorted[b];
                    const d   = Math.hypot(pa.px - pb.px, pa.py - pb.py);
                    const lim = CONN_DIST * sc;
                    if (d < lim) {
                        const t     = 1 - d / lim;
                        const depth = (Math.min(pa.z, pb.z) + RADIUS) / (2 * RADIUS);
                        ctx.beginPath();
                        ctx.moveTo(pa.px, pa.py);
                        ctx.lineTo(pb.px, pb.py);
                        ctx.strokeStyle = `rgba(61,241,246,${(t * depth * 0.38).toFixed(3)})`;
                        ctx.stroke();
                    }
                }
            }

            // ── Dots ────────────────────────────────────────────────────────
            for (const p of sorted) {
                const depth = (p.z + RADIUS) / (2 * RADIUS); // 0=back 1=front
                const r     = (1.1 + depth * 3.8) * sc;
                const alpha = 0.12 + depth * 0.88;

                // Glow halo
                const grd = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 5);
                grd.addColorStop(0, `rgba(61,241,246,${(alpha * 0.55).toFixed(3)})`);
                grd.addColorStop(1, "rgba(61,241,246,0)");
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(p.px, p.py, r * 5, 0, Math.PI * 2);
                ctx.fill();

                // Core dot
                ctx.fillStyle = `rgba(61,241,246,${alpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── Ambient centre glow ─────────────────────────────────────────
            const ag = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * sc * 1.2);
            ag.addColorStop(0,   "rgba(61,241,246,0.07)");
            ag.addColorStop(0.5, "rgba(21,0,137,0.05)");
            ag.addColorStop(1,   "rgba(0,0,0,0)");
            ctx.fillStyle = ag;
            ctx.beginPath();
            ctx.arc(cx, cy, RADIUS * sc * 1.2, 0, Math.PI * 2);
            ctx.fill();

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.9 }}
        />
    );
}

// ─── Animated character ───────────────────────────────────────────────────────
interface AnimatedCharProps {
    char: string;
    charIndex: number;
    totalChars: number;
    progress: MotionValue<number>;
    segmentStart: number;
    segmentEnd: number;
    isLast: boolean;
}

function AnimatedChar({ char, charIndex, totalChars, progress, segmentStart, segmentEnd, isLast }: AnimatedCharProps) {
    const dur = segmentEnd - segmentStart;

    const inStagger  = (charIndex / totalChars) * dur * 0.22;
    const outStagger = ((totalChars - 1 - charIndex) / totalChars) * dur * 0.22;

    const p0 = segmentStart + inStagger;
    const p1 = segmentStart + dur * 0.44;
    const p2 = segmentStart + dur * 0.64;
    const p3 = isLast ? segmentEnd : Math.max(segmentEnd - outStagger, p2 + 0.002);

    const s1 = Math.max(p0 + 0.002, p1);
    const s2 = Math.max(s1 + 0.002, p2);
    const s3 = Math.max(s2 + 0.002, p3);

    const seed    = charIndex * 2.399;
    const sX      = Math.sin(seed) * 300;
    const sY      = Math.cos(seed * 1.3) * 160;
    const sRot    = Math.sin(seed * 1.7) * 45;

    const x      = useTransform(progress, [p0, s1, s2, s3], [sX,   0, 0, isLast ? 0 : -sX * 0.7]);
    const y      = useTransform(progress, [p0, s1, s2, s3], [sY,   0, 0, isLast ? 0 : -sY * 0.7]);
    const opacity= useTransform(progress, [p0, s1, s2, s3], [0,    1, 1, isLast ? 1 : 0]);
    const rotate = useTransform(progress, [p0, s1, s2, s3], [sRot, 0, 0, isLast ? 0 : -sRot * 0.5]);
    const scale  = useTransform(progress, [p0, s1, s2, s3], [0.3,  1, 1, isLast ? 1 : 0.3]);
    const blur   = useTransform(progress, [p0, s1, s2, s3], [14,   0, 0, isLast ? 0 : 12]);
    const filter = useTransform(blur, (v) => `blur(${v}px)`);

    if (char === " ") return <span style={{ display: "inline-block", width: "0.35em" }} />;

    return (
        <motion.span style={{ x, y, opacity, rotate, scale, filter, display: "inline-block", willChange: "transform, filter" }}>
            {char}
        </motion.span>
    );
}

// ─── Phrase layer ─────────────────────────────────────────────────────────────
interface PhraseLayerProps {
    text: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
}

function PhraseLayer({ text, index, total, progress }: PhraseLayerProps) {
    const segment = 1 / total;
    const start   = index * segment;
    const end     = (index + 1) * segment;
    const isLast  = index === total - 1;
    const chars   = text.split("");

    return (
        <div
            aria-label={text}
            style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
            }}
        >
            <h2
                className="text-6xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-none select-none px-4"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    fontFamily: "var(--font-gess), sans-serif",
                    fontWeight: 700,
                    textShadow: "0 0 60px rgba(61,241,246,0.35), 0 0 120px rgba(61,241,246,0.15)",
                }}
            >
                {chars.map((char, i) => (
                    <AnimatedChar
                        key={i}
                        char={char}
                        charIndex={i}
                        totalChars={chars.length}
                        progress={progress}
                        segmentStart={start}
                        segmentEnd={end}
                        isLast={isLast}
                    />
                ))}
            </h2>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SocialMediaVideoScrub() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Spring for character animations — fluid, momentum feel
    const charProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 18, mass: 0.9 });

    // Spring for progress bar — snappier
    const barProgress  = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.3 });

    const barScaleX   = useTransform(barProgress,      [0, 1],    [0, 1]);
    const hintOpacity = useTransform(scrollYProgress,  [0, 0.06], [1, 0]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[300vh]"
            style={{ background: "#050510" }}
            aria-label="Vertex Media — WE IDEATE, CREATE, ELEVATE"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* ── Background radial glow ─────────────────────── */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(21,0,137,0.25) 0%, rgba(5,5,16,0) 70%)",
                    }}
                />

                {/* ── 3D Globe ──────────────────────────────────── */}
                <GlobeCanvas scrollProgress={scrollYProgress} />

                {/* ── Overlay for text contrast ─────────────────── */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(5,5,16,0.35) 0%, rgba(5,5,16,0) 100%)" }}
                />

                {/* ── Character-split phrases ────────────────────── */}
                <div className="absolute inset-0 z-20">
                    {PHRASES.map((phrase, i) => (
                        <PhraseLayer
                            key={phrase}
                            text={phrase}
                            index={i}
                            total={PHRASES.length}
                            progress={charProgress}
                        />
                    ))}
                </div>

                {/* ── Scroll hint ───────────────────────────────── */}
                <motion.div
                    style={{ opacity: hintOpacity }}
                    className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none"
                >
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 font-semibold">
                        Scroll to Explore
                    </span>
                    <div className="w-px h-14 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "110%"] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
                            className="w-full h-full bg-[#3df1f6]"
                        />
                    </div>
                </motion.div>

                {/* ── Progress bar ──────────────────────────────── */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-30">
                    <motion.div
                        style={{ scaleX: barScaleX, transformOrigin: "left" }}
                        className="h-full bg-[#3df1f6] shadow-[0_0_12px_rgba(61,241,246,0.7)]"
                    />
                </div>

            </div>
        </section>
    );
}