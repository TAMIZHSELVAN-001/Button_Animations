import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  Copy,
  Heart,
  LoaderCircle,
  MousePointer2,
  PartyPopper,
  RotateCcw,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const base =
  "relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed";
const green = `${base} bg-emerald-400 text-slate-950 hover:bg-emerald-300`;
const dark = `${base} border border-slate-600 bg-slate-800 text-slate-100 hover:border-slate-400 hover:bg-slate-700`;
const purple = `${base} bg-violet-500 text-white hover:bg-violet-400`;
const pink = `${base} bg-pink-500 text-white hover:bg-pink-400`;
const blue = `${base} bg-sky-500 text-slate-950 hover:bg-sky-400`;

function DemoCard({ number, title, description, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: (number % 4) * 0.035 }}
      className="flex min-h-52 flex-col rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/10"
    >
      <div className="mb-4 flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/5 text-xs font-black text-emerald-300 ring-1 ring-white/10">
          {String(number).padStart(2, "0")}
        </span>
        <div>
          <h2 className="font-semibold text-white">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
        </div>
      </div>
      <div className="mt-auto flex min-h-16 items-center justify-center rounded-xl bg-slate-950/70 p-3">
        {children}
      </div>
    </motion.article>
  );
}

export default function App() {
  const [liked, setLiked] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [scrambled, setScrambled] = useState("CLICK TO SCRAMBLE");
  const [circle, setCircle] = useState(false);
  const [borderDrawn, setBorderDrawn] = useState(false);
  const [elastic, setElastic] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [split, setSplit] = useState(false);
  const [holding, setHolding] = useState(false);
  const [held, setHeld] = useState(false);
  const [copied, setCopied] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [floating, setFloating] = useState(false);
  const [slide, setSlide] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [toggle, setToggle] = useState(false);
  const [gradient, setGradient] = useState(false);
  const [bounceText, setBounceText] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const holdTimer = useRef(null);
  const progressTimer = useRef(null);
  const loadingTimer = useRef(null);
  const scrambleTimer = useRef(null);
  const countdownTimer = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(holdTimer.current);
      clearTimeout(progressTimer.current);
      clearTimeout(loadingTimer.current);
      clearInterval(scrambleTimer.current);
      clearInterval(countdownTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!countdownActive) return undefined;
    setCountdownValue(3);
    let value = 3;
    countdownTimer.current = setInterval(() => {
      value -= 1;
      if (value <= 0) {
        clearInterval(countdownTimer.current);
        setCountdownValue(0);
        setCountdownActive(false);
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 } });
        setTimeout(() => setCountdownValue(3), 1000);
      } else {
        setCountdownValue(value);
      }
    }, 800);
    return () => clearInterval(countdownTimer.current);
  }, [countdownActive]);

  const fireConfetti = () => {
    confetti({
      particleCount: 95,
      spread: 75,
      startVelocity: 35,
      origin: { y: 0.65 },
    });
  };

  const startHold = () => {
    clearTimeout(holdTimer.current);
    setHolding(true);
    setHeld(false);
    holdTimer.current = setTimeout(() => {
      setHeld(true);
      setHolding(false);
      fireConfetti();
    }, 1100);
  };

  const stopHold = () => {
    clearTimeout(holdTimer.current);
    setHolding(false);
  };

  const runProgress = () => {
    clearTimeout(progressTimer.current);
    setProgress(true);
    progressTimer.current = setTimeout(() => setProgress(false), 1600);
  };

  const runScramble = () => {
    const target = "ZENMOOVZ UNLOCKED";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let iteration = 0;
    clearInterval(scrambleTimer.current);
    scrambleTimer.current = setInterval(() => {
      setScrambled(
        target
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      iteration += 0.7;
      if (iteration >= target.length) {
        clearInterval(scrambleTimer.current);
        setScrambled(target);
      }
    }, 35);
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText("ZENMOOVZ");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const magneticMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMagneticPos({
      x: (event.clientX - rect.left - rect.width / 2) * 0.18,
      y: (event.clientY - rect.top - rect.height / 2) * 0.18,
    });
  };

  return (
    <main
      id="top"
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/50 via-slate-950 to-[#070b12] px-4 py-8 text-slate-100 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-10 overflow-hidden rounded-3xl border border-emerald-300/20 bg-slate-900/70 px-6 py-8 shadow-2xl shadow-emerald-950/20 sm:px-10 sm:py-12">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 -top-20 size-64 rounded-full bg-emerald-400/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                <Zap size={14} /> Interactive playground
              </p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-black tracking-tight text-white sm:text-6xl"
              >
                ZENMOOVZ <span className="text-emerald-300">Motion Lab</span>
              </motion.h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                31 button interaction concepts built with React, Tailwind CSS
                and Framer Motion. Click, hover, hold and double-click to
                explore them.
              </p>
            </div>
            <div className="flex gap-3 text-xs font-semibold text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                31 demos
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Tailwind utilities
              </span>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <DemoCard
            number={1}
            title="Bounce on press"
            description="Springs down then bounces back on click."
          >
            <motion.button
              className={green}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.88, y: 2 }}
              transition={{ type: "spring", stiffness: 450, damping: 12 }}
            >
              Bounce <ArrowRight size={16} />
            </motion.button>
          </DemoCard>

          <DemoCard
            number={2}
            title="Neon glow"
            description="A soft emerald glow grows on hover."
          >
            <motion.button
              className={green}
              whileHover={{
                boxShadow: "0 0 8px #34d399, 0 0 28px #10b98188",
                scale: 1.04,
              }}
              whileTap={{ scale: 0.96 }}
            >
              {" "}
              <Sparkles size={16} /> Neon glow
            </motion.button>
          </DemoCard>

          <DemoCard
            number={3}
            title="Ripple click"
            description="A circular ripple appears when clicked."
          >
            <motion.button
              className={dark}
              onClick={() => {
                setRipple(true);
                setTimeout(() => setRipple(false), 550);
              }}
              whileTap={{ scale: 0.97 }}
            >
              {ripple && (
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/50"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 13, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Tap for ripple</span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={4}
            title="Add to cart"
            description="Cart icon hops and the label changes."
          >
            <motion.button
              className={green}
              onClick={() => {
                setCartAdded(true);
                setTimeout(() => setCartAdded(false), 1400);
              }}
              whileTap={{ scale: 0.94 }}
            >
              <motion.span
                animate={
                  cartAdded
                    ? { y: [0, -8, 0], rotate: [0, -12, 10, 0] }
                    : { y: 0 }
                }
                transition={{ duration: 0.45 }}
              >
                <ShoppingCart size={17} />
              </motion.span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={cartAdded ? "added" : "add"}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.15 }}
                >
                  {cartAdded ? "Added!" : "Add to cart"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={5}
            title="Favourite heart"
            description="Heart scales and changes to pink."
          >
            <motion.button
              className={dark}
              onClick={() => setLiked((v) => !v)}
              whileTap={{ scale: 0.85 }}
              animate={
                liked
                  ? { borderColor: "#ec4899", backgroundColor: "#83184355" }
                  : { borderColor: "#475569", backgroundColor: "#1e293b" }
              }
            >
              <motion.span
                animate={
                  liked
                    ? { scale: [1, 1.55, 1], rotate: [0, -12, 0] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.35 }}
              >
                <Heart
                  size={17}
                  fill={liked ? "#f472b6" : "none"}
                  color={liked ? "#f472b6" : "currentColor"}
                />
              </motion.span>
              {liked ? "Favourited" : "Favourite"}
            </motion.button>
          </DemoCard>

          <DemoCard
            number={6}
            title="Shake on hover"
            description="A quick shake makes the button feel active."
          >
            <motion.button
              className={pink}
              whileHover={{
                x: [0, -3, 3, -3, 3, 0],
                rotate: [0, -1, 1, -1, 1, 0],
              }}
              transition={{ duration: 0.35 }}
            >
              Shake it <Zap size={16} />
            </motion.button>
          </DemoCard>

          <DemoCard
            number={7}
            title="3D flip"
            description="The button flips vertically when clicked."
          >
            <motion.button
              className={purple}
              onClick={() => setTilt((v) => !v)}
              animate={{ rotateX: tilt ? 360 : 0 }}
              transition={{ duration: 0.65, type: "spring" }}
              style={{ transformPerspective: 600 }}
            >
              <RotateCcw size={16} /> Flip me
            </motion.button>
          </DemoCard>

          <DemoCard
            number={8}
            title="Success confetti"
            description="Confetti bursts from the page after clicking."
          >
            <motion.button
              className={green}
              onClick={() => {
                setSuccess(true);
                fireConfetti();
                setTimeout(() => setSuccess(false), 1300);
              }}
              whileTap={{ scale: 0.94 }}
            >
              {success ? <CircleCheck size={17} /> : <PartyPopper size={17} />}
              {success ? "Success!" : "Celebrate"}
            </motion.button>
          </DemoCard>

          <DemoCard
            number={9}
            title="Loading state"
            description="Simulates a short product-processing action."
          >
            <motion.button
              className={blue}
              disabled={loading}
              onClick={() => {
                setLoading(true);
                clearTimeout(loadingTimer.current);
                loadingTimer.current = setTimeout(
                  () => setLoading(false),
                  1400,
                );
              }}
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" size={17} /> Processing
                </>
              ) : (
                "Place order"
              )}
            </motion.button>
          </DemoCard>

          <DemoCard
            number={10}
            title="3D press"
            description="Pressing makes the button sink into the page."
          >
            <motion.button
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_6px_0_#b45309]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 5, boxShadow: "0 1px 0 #b45309" }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              Press down
            </motion.button>
          </DemoCard>

          <DemoCard
            number={11}
            title="Glitch effect"
            description="Layered labels jitter briefly on click."
          >
            <motion.button
              className={`${base} bg-fuchsia-600 text-white`}
              onClick={() => {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 500);
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative">
                GLITCH
                {glitch && (
                  <>
                    <motion.span
                      className="absolute inset-0 text-cyan-200"
                      animate={{
                        x: [-3, 3, -2, 0],
                        opacity: [0.9, 0.5, 0.9, 0],
                      }}
                      transition={{ duration: 0.4 }}
                      aria-hidden="true"
                    >
                      GLITCH
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 text-yellow-200"
                      animate={{
                        x: [3, -2, 2, 0],
                        opacity: [0.8, 0.3, 0.8, 0],
                      }}
                      transition={{ duration: 0.4 }}
                      aria-hidden="true"
                    >
                      GLITCH
                    </motion.span>
                  </>
                )}
              </span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={12}
            title="Text scramble"
            description="Letters scramble before resolving to ZENMOOVZ."
          >
            <motion.button
              className={`${base} min-w-44 bg-slate-800 font-mono text-emerald-300 ring-1 ring-emerald-300/40`}
              onClick={runScramble}
              whileTap={{ scale: 0.96 }}
            >
              <span className="text-xs">{scrambled}</span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={13}
            title="Expanding circle"
            description="A green circle grows across the button."
          >
            <motion.button
              className={`${base} isolate border border-emerald-400/50 bg-slate-800 text-white`}
              onClick={() => {
                setCircle(true);
                setTimeout(() => setCircle(false), 700);
              }}
            >
              {circle && (
                <motion.span
                  className="absolute left-1/2 top-1/2 -z-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 12 }}
                  transition={{ duration: 0.55 }}
                />
              )}
              <span className="relative z-10">Reveal effect</span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={14}
            title="Drawn border"
            description="An SVG outline draws around the button on click."
          >
            <motion.button
              className={`${base} min-w-36 bg-slate-800 text-white`}
              onClick={() => {
                setBorderDrawn(true);
                setTimeout(() => setBorderDrawn(false), 1100);
              }}
            >
              {borderDrawn && (
                <svg
                  className="pointer-events-none absolute inset-0 size-full"
                  viewBox="0 0 160 48"
                  preserveAspectRatio="none"
                >
                  <motion.rect
                    x="1"
                    y="1"
                    width="158"
                    height="46"
                    rx="11"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                    pathLength="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </svg>
              )}
              <span className="relative z-10">Draw border</span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={15}
            title="Elastic morph"
            description="The button stretches into a wider shape."
          >
            <motion.button
              className={purple}
              animate={
                elastic
                  ? {
                      scaleX: [1, 1.25, 0.94, 1.1, 1],
                      borderRadius: ["12px", "24px", "10px", "18px", "12px"],
                    }
                  : { scaleX: 1 }
              }
              onClick={() => setElastic((v) => !v)}
              transition={{ duration: 0.65, type: "spring" }}
            >
              Elastic <Sparkles size={16} />
            </motion.button>
          </DemoCard>

          <DemoCard
            number={16}
            title="Error shake"
            description="Displays a red error message with a shake."
          >
            <div className="flex flex-col items-center gap-2">
              <motion.button
                className={`${base} bg-rose-600 text-white`}
                animate={error ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
                onClick={() => {
                  setError(true);
                  setTimeout(() => setError(false), 650);
                }}
              >
                {" "}
                <Zap size={16} /> Invalid action{" "}
              </motion.button>
              <AnimatePresence>
                {error && (
                  <motion.span
                    className="text-xs font-medium text-rose-300"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please try again
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </DemoCard>

          <DemoCard
            number={17}
            title="Progress fill"
            description="A fill bar moves across the button before resetting."
          >
            <motion.button
              className={`${base} min-w-40 bg-slate-800 text-white ring-1 ring-white/15`}
              onClick={runProgress}
            >
              <motion.span
                className="absolute inset-y-0 left-0 bg-emerald-400/90"
                initial={{ width: "0%" }}
                animate={{ width: progress ? "100%" : "0%" }}
                transition={{ duration: progress ? 1.5 : 0.2, ease: "linear" }}
              />
              <span
                className={`relative z-10 flex items-center gap-2 ${progress ? "text-slate-950" : "text-white"}`}
              >
                {progress ? "Working…" : "Start progress"}
              </span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={18}
            title="Icon rotation"
            description="The refresh icon rotates a full turn."
          >
            <motion.button
              className={dark}
              onClick={() => {
                setRotated(true);
                setTimeout(() => setRotated(false), 700);
              }}
            >
              <motion.span
                animate={{ rotate: rotated ? 360 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <RotateCcw size={17} />
              </motion.span>{" "}
              Refresh
            </motion.button>
          </DemoCard>

          <DemoCard
            number={19}
            title="Split reveal"
            description="Two color panels slide apart to reveal the label."
          >
            <motion.button
              className={`${base} min-w-36 bg-slate-800 text-white`}
              onClick={() => {
                setSplit((v) => !v);
                setTimeout(() => setSplit(false), 900);
              }}
            >
              <motion.span
                className="absolute inset-y-0 left-0 w-1/2 bg-violet-500"
                animate={{ x: split ? "-100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
              <motion.span
                className="absolute inset-y-0 right-0 w-1/2 bg-violet-500"
                animate={{ x: split ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">
                {split ? "Revealed!" : "Split reveal"}
              </span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={20}
            title="Hold to confirm"
            description="Hold the button for about 1.1 seconds to confirm."
          >
            <motion.button
              className={`${base} min-w-40 select-none bg-emerald-400 text-slate-950`}
              onPointerDown={startHold}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onContextMenu={(e) => e.preventDefault()}
            >
              <motion.span
                className="absolute inset-y-0 left-0 bg-white/45"
                animate={{ width: holding ? "100%" : "0%" }}
                transition={{ duration: holding ? 1.1 : 0.1, ease: "linear" }}
              />
              <span className="relative z-10">
                {held
                  ? "Confirmed ✓"
                  : holding
                    ? "Keep holding…"
                    : "Hold to confirm"}
              </span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={21}
            title="Copy to check"
            description="Copies the shop name and changes the icon."
          >
            <motion.button
              className={dark}
              onClick={copyText}
              whileTap={{ scale: 0.96 }}
            >
              {copied ? (
                <Check size={17} className="text-emerald-300" />
              ) : (
                <Copy size={17} />
              )}
              {copied ? "Copied!" : "Copy shop name"}
            </motion.button>
          </DemoCard>

          <DemoCard
            number={22}
            title="3D tilt"
            description="Click to tilt the button in perspective."
          >
            <motion.button
              className={blue}
              animate={{
                rotateX: tilt ? 22 : 0,
                rotateY: tilt ? -18 : 0,
                scale: tilt ? 1.05 : 1,
              }}
              onClick={() => setTilt((v) => !v)}
              transition={{ type: "spring", stiffness: 240, damping: 13 }}
              style={{ transformPerspective: 450 }}
            >
              3D tilt <MousePointer2 size={16} />
            </motion.button>
          </DemoCard>

          <DemoCard
            number={23}
            title="Pulse effect"
            description="Click to pulse repeatedly, click again to stop."
          >
            <motion.button
              className={green}
              animate={
                pulse
                  ? {
                      scale: [1, 1.09, 1],
                      boxShadow: [
                        "0 0 0 0 #34d39900",
                        "0 0 0 12px #34d39925",
                        "0 0 0 0 #34d39900",
                      ],
                    }
                  : { scale: 1 }
              }
              transition={
                pulse ? { duration: 1, repeat: Infinity } : { duration: 0.2 }
              }
              onClick={() => setPulse((v) => !v)}
            >
              <Sparkles size={16} /> {pulse ? "Stop pulse" : "Pulse me"}
            </motion.button>
          </DemoCard>

          <DemoCard
            number={24}
            title="Floating icon"
            description="The star floats up and down on hover."
          >
            <motion.button
              className={purple}
              onHoverStart={() => setFloating(true)}
              onHoverEnd={() => setFloating(false)}
              whileTap={{ scale: 0.96 }}
            >
              <motion.span
                animate={floating ? { y: [0, -7, 0] } : { y: 0 }}
                transition={
                  floating
                    ? { duration: 0.6, repeat: Infinity }
                    : { duration: 0.2 }
                }
              >
                <Star size={17} fill="currentColor" />
              </motion.span>{" "}
              Hover here
            </motion.button>
          </DemoCard>

          <DemoCard
            number={25}
            title="Sliding background"
            description="A colored layer slides in from the left."
          >
            <motion.button
              className={`${base} min-w-40 bg-slate-800 text-white ring-1 ring-slate-600`}
              onClick={() => setSlide((v) => !v)}
            >
              <motion.span
                className="absolute inset-0 -z-0 bg-emerald-400"
                initial={{ x: "-101%" }}
                animate={{ x: slide ? "0%" : "-101%" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
              <span
                className={`relative z-10 flex items-center gap-2 ${slide ? "text-slate-950" : "text-white"}`}
              >
                Slide background <ChevronRight size={16} />
              </span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={26}
            title="Double-click action"
            description="Double-click to show the success state."
          >
            <motion.button
              className={pink}
              onClick={() => setDoubleClick(false)}
              onDoubleClick={() => {
                setDoubleClick(true);
                fireConfetti();
              }}
              whileTap={{ scale: 0.96 }}
            >
              {doubleClick ? (
                <>
                  <Check size={16} /> Double-clicked!
                </>
              ) : (
                "Double-click me"
              )}
            </motion.button>
          </DemoCard>

          <DemoCard
            number={27}
            title="Countdown"
            description="Starts a short countdown and celebrates at zero."
          >
            <motion.button
              className={purple}
              disabled={countdownActive}
              onClick={() => {
                setCountdownValue(3);
                setCountdownActive(true);
              }}
              whileTap={{ scale: 0.96 }}
            >
              {countdownActive
                ? `Starting in ${countdownValue}…`
                : countdownValue === 0
                  ? "Go!"
                  : "Start countdown"}{" "}
              <ArrowRight size={16} />
            </motion.button>
          </DemoCard>

          <DemoCard
            number={28}
            title="Animated toggle"
            description="Switches between enabled and disabled states."
          >
            <button
              type="button"
              aria-pressed={toggle}
              onClick={() => setToggle((v) => !v)}
              className={`inline-flex items-center gap-3 rounded-full border p-1.5 pr-4 transition-colors ${toggle ? "border-emerald-300/40 bg-emerald-400/15" : "border-slate-600 bg-slate-800"}`}
            >
              <span
                className={`relative flex h-7 w-12 items-center rounded-full p-1 transition-colors ${toggle ? "bg-emerald-400" : "bg-slate-600"}`}
              >
                <motion.span
                  className="size-5 rounded-full bg-white shadow"
                  animate={{ x: toggle ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                />
              </span>
              <span className="min-w-16 text-sm font-semibold">
                {toggle ? "Enabled" : "Disabled"}
              </span>
            </button>
          </DemoCard>

          <DemoCard
            number={29}
            title="Rotating gradient border"
            description="Click to start or stop a rotating gradient edge."
          >
            <motion.button
              className="relative isolate rounded-xl p-[2px] text-sm font-bold text-white"
              onClick={() => setGradient((v) => !v)}
              whileTap={{ scale: 0.96 }}
            >
              <motion.span
                className="absolute inset-0 -z-10 rounded-xl bg-[conic-gradient(from_0deg,#34d399,#60a5fa,#c084fc,#fb7185,#34d399)]"
                animate={{ rotate: gradient ? 360 : 0 }}
                transition={
                  gradient
                    ? { duration: 2.5, repeat: Infinity, ease: "linear" }
                    : { duration: 0.3 }
                }
              />
              <span className="block rounded-[10px] bg-slate-900 px-4 py-3">
                {gradient ? "Stop gradient" : "Gradient border"}
              </span>
            </motion.button>
          </DemoCard>

          <DemoCard
            number={30}
            title="Bouncing text"
            description="Letters jump in sequence when clicked."
          >
            <motion.button
              className={blue}
              onClick={() => {
                setBounceText(true);
                setTimeout(() => setBounceText(false), 900);
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex">
                {"ZENMOOVZ".split("").map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    animate={bounceText ? { y: [0, -9, 0] } : { y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.055 }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <Sparkles size={15} />
            </motion.button>
          </DemoCard>

          <DemoCard
            number={31}
            title="Magnetic hover"
            description="The button follows your cursor slightly and springs back."
          >
            <motion.button
              className={`${base} bg-slate-800 text-emerald-200 ring-1 ring-emerald-300/40`}
              animate={{ x: magneticPos.x, y: magneticPos.y }}
              transition={{ type: "spring", stiffness: 250, damping: 14 }}
              onMouseMove={magneticMove}
              onMouseLeave={() => setMagneticPos({ x: 0, y: 0 })}
              whileTap={{ scale: 0.94 }}
            >
              <MousePointer2 size={16} /> Move your mouse
            </motion.button>
          </DemoCard>
        </section>

        <footer className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-bold tracking-wider text-white">
              ZENMOOVZ <span className="text-emerald-300">× Motion Lab</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Built for exploring animated sports-store interactions.
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top <ArrowRight size={15} />
          </a>
        </footer>
      </div>
    </main>
  );
}
