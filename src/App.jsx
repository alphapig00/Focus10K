import { useState, useEffect, useRef } from 'react';

/* ─── Icons ───────────────────────────────────────────────────────── */
const TimerIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#555555'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" />
  </svg>
);
const DashIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#555555'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="7" width="4" height="14" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);
const TaskIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#555555'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
const GearIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#555555'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PlayIcon = ({ color = '#1A1A1A' }) => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill={color} stroke="none" />
  </svg>
);
const PauseIcon = ({ color = '#1A1A1A' }) => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="10" y1="9" x2="10" y2="15" /><line x1="14" y1="9" x2="14" y2="15" />
  </svg>
);
/* Fix 2: Clean, proportioned reset icon — standard undo/refresh path */
const ResetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <polyline points="3 3 3 8 8 8" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64FFDA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6m4-6v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ─── Toggle Switch ───────────────────────────────────────────────── */
function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle}
      className="relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
      style={{ background: on ? '#64FFDA' : '#D0D0D0' }} role="switch" aria-checked={on}>
      <span className="inline-block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: on ? 'translateX(22px)' : 'translateX(2px)' }} />
    </button>
  );
}

/* ─── Modal ───────────────────────────────────────────────────────── */
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end w-full max-w-2xl left-1/2 -translate-x-1/2">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div className="relative rounded-t-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', borderBottom: 'none', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full" style={{ background: '#CCCCCC' }} /></div>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #E8E8E8' }}>
          <span className="text-gray-900 font-semibold text-base">{title}</span>
          <button onClick={onClose} className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: '#EEEEEE' }}><XIcon /></button>
        </div>
        <div className="overflow-y-auto px-5 py-4" style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── About ───────────────────────────────────────────────────────── */
function AboutContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold" style={{ background: '#64FFDA', color: '#0D0D0D' }}>F</div>
        <div><p className="text-gray-900 font-semibold text-lg leading-tight">Focus10K</p><p className="text-xs" style={{ color: '#888' }}>Version 1.0.0</p></div>
      </div>
      <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.7' }}>Focus10K is built on the idea that mastery takes 10,000 hours. This app helps you log, track, and stay consistent with your deep-work sessions — one focused minute at a time.</p>
      <div style={{ height: '1px', background: '#EEEEEE' }} />
      <div>
        <p className="text-gray-900 text-sm font-semibold mb-2">What's included</p>
        {['Pomodoro-style focus timer', 'Category tracking & color labels', 'Weekly progress dashboard', 'Streak tracking & milestones', 'Dark mode — always'].map(item => (
          <div key={item} className="flex items-center gap-2 py-1.5">
            <div className="w-1 h-1 rounded-full" style={{ background: '#64FFDA' }} />
            <span style={{ color: '#aaa', fontSize: '13px' }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ height: '1px', background: '#EEEEEE' }} />
      <p style={{ color: '#555', fontSize: '12px', textAlign: 'center' }}>Built with focus. Made for makers.</p>
    </div>
  );
}

/* ─── Privacy ─────────────────────────────────────────────────────── */
function PrivacyContent() {
  const sections = [
    { title: 'Information We Collect', body: 'Focus10K collects minimal data necessary to provide the service. This includes your email address for account creation, your focus session logs (duration, category, timestamp), and app preference settings. We do not collect any personally identifiable information beyond what you explicitly provide.' },
    { title: 'How We Use Your Data', body: 'Your session data is used solely to generate your personal statistics — streaks, total hours, category breakdowns, and milestone progress. We do not sell, share, or transmit your data to third parties. All session data is stored locally on your device and optionally synced to your account if you opt in to cloud backup.' },
    { title: 'Data Retention', body: 'You may delete your account and all associated data at any time from the Account settings. Upon deletion, all your data is permanently removed from our servers within 30 days. Local app data can be cleared by uninstalling the application.' },
    { title: 'Third-Party Services', body: 'Focus10K uses Firebase Authentication for secure sign-in and may display third-party advertisements through Google AdMob. These services have their own privacy policies. Ad content is served in a privacy-respecting manner and we do not pass personally identifiable information to advertisers.' },
    { title: 'Security', body: 'We take the security of your data seriously. All data transmitted between the app and our servers is encrypted using TLS. Passwords are never stored in plain text. We regularly review our security practices to ensure your information is protected.' },
    { title: 'Changes to This Policy', body: 'We may update this Privacy Policy from time to time. When we do, we will notify you via the app or email. Continued use of Focus10K after changes constitutes your acceptance of the updated policy. This policy was last updated March 2026.' },
  ];
  return (
    <div className="space-y-5">
      <p style={{ color: '#888', fontSize: '13px' }}>Effective date: March 10, 2026</p>
      {sections.map(s => (
        <div key={s.title}>
          <p className="text-gray-900 text-sm font-semibold mb-1.5">{s.title}</p>
          <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.75' }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Timer helpers ───────────────────────────────────────────────── */
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/* ─── Timer Phase Accents ────────────────────────────────────────── */
const WORK_ACCENT  = '#64FFDA';   // mint
const BREAK_ACCENT = '#818CF8';   // lavender

/* ─── Pomodoro Presets ───────────────────────────────────────────── */
const POMO_PRESETS = {
  classic: { work: 25 * 60, shortBreak:  5 * 60, longBreak: 15 * 60 },
  deep:    { work: 50 * 60, shortBreak: 10 * 60, longBreak: 30 * 60 },
};

/* ─── Timer Categories ───────────────────────────────────────────── */
const DEFAULT_CATS = [
  { name: 'Work',    color: '#64FFDA' },
  { name: 'Study',   color: '#A78BFA' },
  { name: 'Piano',   color: '#F97316' },
  { name: 'Gym',     color: '#FB7185' },
  { name: 'Reading', color: '#FBBF24' },
  { name: 'Coding',  color: '#60A5FA' },
  { name: 'Design',  color: '#E879F9' },
];

// Palette for auto-assigning colors to new categories
const CAT_COLORS = [
  '#64FFDA', '#A78BFA', '#F97316', '#FB7185', '#FBBF24', '#60A5FA', '#E879F9',
  '#34D399', '#F472B6', '#38BDF8', '#FACC15', '#FB923C', '#C084FC', '#4ADE80',
  '#818CF8', '#F87171', '#2DD4BF', '#FCD34D',
];

/* ─── Category Management Modal ───────────────────────────────────── */
function CategoryModal({ isOpen, onClose, categories, setCategories }) {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const usedColors = categories.map(c => c.color);
  const nextColor  = CAT_COLORS.find(c => !usedColors.includes(c))
                     ?? CAT_COLORS[categories.length % CAT_COLORS.length];

  const handleAdd = () => {
    const name = input.trim();
    if (!name) return;
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) return;
    setCategories(prev => [...prev, { name, color: nextColor }]);
    setInput('');
  };

  const handleDelete = (idx) => {
    setCategories(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}>

      {/* Dialog */}
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white">Categories</h2>
          <button onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors focus:outline-none">
            <XIcon />
          </button>
        </div>

        {/* Add row */}
        <div className="flex gap-3 mb-6">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="New category…"
            className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-500"
          />
          <button onClick={handleAdd}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl px-6 py-3 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] focus:outline-none active:scale-95">
            Add
          </button>
        </div>

        {/* Category list */}
        <div className="max-h-72 overflow-y-auto -mx-2 px-2">
          {categories.map((c, i) => (
            <div key={c.name}
              className="flex items-center justify-between p-3 mb-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group">
              <div className="flex items-center gap-3">
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: c.color, flexShrink: 0,
                  boxShadow: `0 0 6px ${c.color}80`,
                }} />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">{c.name}</span>
              </div>
              {categories.length > 1 && (
                <button onClick={() => handleDelete(i)}
                  className="text-gray-600 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:outline-none">
                  <TrashIcon />
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function TimerView({ categories, setCategories }) {
  const [mode, setMode]                         = useState('pomodoro');
  const [phase, setPhase]                       = useState('work');      // 'work' | 'break'
  const [isRunning, setIsRunning]               = useState(false);
  const [countdownSecs, setCountdown]           = useState(25 * 60);
  const [workDuration, setWorkDuration]         = useState(25 * 60);
  const [breakDuration, setBreakDuration]       = useState(5 * 60);
  const [customMins, setCustomMins]             = useState('25');
  const [customSec,  setCustomSec]              = useState('00');
  const [customBreakMins, setCustomBreakMins]   = useState('5');
  const [customBreakSec,  setCustomBreakSec]    = useState('00');
  const [swSecs, setSwSecs]                     = useState(0);
  const [catIdx, setCatIdx]                     = useState(0);
  const [catModalOpen, setCatModalOpen]         = useState(false);
  const [flash, setFlash]                       = useState(false);
  const [pomPreset, setPomPreset]               = useState('classic');  // 'classic' | 'deep'
  const [pomSession, setPomSession]             = useState(0);          // work sessions completed (0–4)
  const intervalRef                             = useRef(null);
  const wakeLockRef                             = useRef(null);
  const prevDoneRef                             = useRef(false);

  /* Cleanup on unmount */
  useEffect(() => () => {
    clearInterval(intervalRef.current);
    wakeLockRef.current?.release().catch(() => {});
  }, []);

  /* Clamp catIdx when categories shrink (e.g. after delete) */
  useEffect(() => {
    setCatIdx(prev => prev >= categories.length ? 0 : prev);
  }, [categories.length]);

  const accent      = phase === 'break' ? BREAK_ACCENT : WORK_ACCENT;
  const cat         = categories[catIdx] ?? categories[0];
  const displaySecs = mode === 'stopwatch' ? swSecs : countdownSecs;
  const done        = mode !== 'stopwatch' && countdownSecs === 0;
  const phaseDur    = phase === 'break' ? breakDuration : workDuration;
  const atStart     = mode === 'stopwatch' ? swSecs === 0 : countdownSecs === phaseDur;
  const phaseLabel  = done
    ? 'COMPLETE'
    : isRunning
      ? (mode === 'stopwatch' ? 'RUNNING' : phase === 'break' ? 'REST' : 'FOCUS')
      : (phase === 'break' ? 'REST' : 'READY');

  /* Pomodoro next-state info text */
  const pomNextInfo = (() => {
    if (mode !== 'pomodoro') return null;
    const p = POMO_PRESETS[pomPreset];
    if (phase === 'work') {
      const num    = pomSession + 1;
      const isLast = pomSession === 3;
      const mins   = (isLast ? p.longBreak : p.shortBreak) / 60;
      return `Session ${num} of 4  ·  Next: ${mins}m ${isLast ? 'long break' : 'break'}`;
    }
    if (pomSession >= 4) return `Long break  ·  Next: Session 1`;
    return `${p.shortBreak / 60}m break  ·  Next: Session ${pomSession + 1}`;
  })();

  /* Side-effects when timer hits 00:00 — auto-switch phase after 2.5 s */
  useEffect(() => {
    if (!done) { prevDoneRef.current = false; return; }
    if (prevDoneRef.current) return;
    prevDoneRef.current = true;
    releaseWakeLock();
    playPing();
    setFlash(true);
    const flashT = setTimeout(() => setFlash(false), 2200);

    let nextPhase, nextDur;
    if (mode === 'pomodoro') {
      if (phase === 'work') {
        const newSess = pomSession + 1;
        setPomSession(newSess);
        const p = POMO_PRESETS[pomPreset];
        nextDur = newSess >= 4 ? p.longBreak : p.shortBreak;
        setBreakDuration(nextDur);
        nextPhase = 'break';
      } else {
        if (pomSession >= 4) setPomSession(0);
        nextPhase = 'work';
        nextDur = workDuration;
      }
    } else {
      nextPhase = phase === 'work' ? 'break' : 'work';
      nextDur   = nextPhase === 'break' ? breakDuration : workDuration;
    }

    const switchT = setTimeout(() => {
      setFlash(false);
      setPhase(nextPhase);
      setCountdown(nextDur);
      prevDoneRef.current = false;
      playPing();
    }, 2500);
    return () => { clearTimeout(flashT); clearTimeout(switchT); };
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const playPing = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 528;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.4);
    } catch (_) {}
  };

  const acquireWakeLock = async () => {
    try {
      if ('wakeLock' in navigator)
        wakeLockRef.current = await navigator.wakeLock.request('screen');
    } catch (_) {}
  };

  const releaseWakeLock = () => {
    wakeLockRef.current?.release().catch(() => {});
    wakeLockRef.current = null;
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    releaseWakeLock();
  };

  const start = () => {
    if (mode === 'stopwatch') {
      intervalRef.current = setInterval(() => setSwSecs(s => s + 1), 1000);
    } else {
      intervalRef.current = setInterval(() => {
        setCountdown(s => {
          if (s <= 1) { clearInterval(intervalRef.current); setIsRunning(false); return 0; }
          return s - 1;
        });
      }, 1000);
    }
    setIsRunning(true);
    acquireWakeLock();
  };

  const reset = () => {
    stop();
    setFlash(false);
    prevDoneRef.current = false;
    setPhase('work');
    if (mode === 'stopwatch') {
      setSwSecs(0);
    } else {
      setCountdown(workDuration);
      if (mode === 'pomodoro') {
        setPomSession(0);
        setBreakDuration(POMO_PRESETS[pomPreset].shortBreak);
      }
    }
  };

  const handlePresetChange = (preset) => {
    stop();
    setFlash(false);
    prevDoneRef.current = false;
    setPomPreset(preset);
    setPomSession(0);
    setPhase('work');
    const p = POMO_PRESETS[preset];
    setWorkDuration(p.work);
    setBreakDuration(p.shortBreak);
    setCountdown(p.work);
  };

  const switchMode = (m) => {
    stop();
    setFlash(false);
    prevDoneRef.current = false;
    setPhase('work');
    setMode(m);
    if (m === 'pomodoro') {
      const p = POMO_PRESETS[pomPreset];
      setWorkDuration(p.work); setBreakDuration(p.shortBreak);
      setCountdown(p.work); setPomSession(0);
    } else if (m === 'custom') {
      const t = Math.max(60, (parseInt(customMins) || 0) * 60 + (parseInt(customSec) || 0));
      setWorkDuration(t); setCountdown(t);
    } else { setSwSecs(0); }
  };

  const applyCustom = () => {
    const wMins = Math.min(99, Math.max(0, parseInt(customMins)      || 0));
    const wSecs = Math.min(59, Math.max(0, parseInt(customSec)       || 0));
    const bMins = Math.min(99, Math.max(0, parseInt(customBreakMins) || 0));
    const bSecs = Math.min(59, Math.max(0, parseInt(customBreakSec)  || 0));
    const wDur  = Math.max(60, wMins * 60 + wSecs);
    const bDur  = Math.max(30, bMins * 60 + bSecs);
    setWorkDuration(wDur);
    setBreakDuration(bDur);
    if (phase === 'work') setCountdown(wDur);
    else setCountdown(bDur);
  };

  return (
    <div className="h-full px-4 pt-4 pb-3"
      style={{ width: '100%', display: 'grid', gridTemplateRows: 'auto 96px 1fr auto', gridTemplateColumns: 'minmax(0, 1fr)', rowGap: '4px', overflow: 'hidden' }}>

      {/* ── TOP: Mode selector pill ── */}
      <div className="flex justify-center" style={{ flexShrink: 0 }}>
        <div className="flex items-center gap-1 p-1 rounded-full"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {[['pomodoro','Pomodoro'], ['custom','Custom'], ['stopwatch','Stopwatch']].map(([m, lbl]) => (
            <button key={m} onClick={() => switchMode(m)}
              className="px-3 py-1 rounded-full transition-all duration-200 focus:outline-none active:scale-95"
              style={{
                background: mode === m ? accent : 'transparent',
                color:      mode === m ? '#0D0D0D' : '#9CA3AF',
                fontSize: '11px', fontWeight: mode === m ? 600 : 400, letterSpacing: '0.4px',
                transition: 'background 0.5s ease, color 0.5s ease',
              }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* ── Row 2: Dynamic zone — fixed 80px, same height in all modes ── */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '24px' }}>

          {/* Pomodoro preset selector — always mounted in pomo mode; hidden via opacity when running */}
          {mode === 'pomodoro' && (
            <div style={{
              display: 'flex', gap: '6px',
              opacity: isRunning ? 0 : 1,
              pointerEvents: isRunning ? 'none' : 'auto',
              transition: 'opacity 0.25s ease',
            }}>
              {[['classic', 'Classic'], ['deep', 'Deep Work']].map(([key, lbl]) => (
                <button key={key} onClick={() => handlePresetChange(key)}
                  className="focus:outline-none"
                  style={{
                    fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '3px 10px', borderRadius: '999px',
                    border: `1px solid ${pomPreset === key ? WORK_ACCENT + '88' : 'rgba(255,255,255,0.15)'}`,
                    color: pomPreset === key ? WORK_ACCENT : '#AAAAAA',
                    background: pomPreset === key ? WORK_ACCENT + '14' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}>
                  {lbl}
                </button>
              ))}
            </div>
          )}

          {/* Custom inputs — always mounted in custom mode; hidden via opacity when running */}
          {mode === 'custom' && (
            <div className="flex items-start gap-8"
              style={{
                opacity: isRunning ? 0 : 1,
                pointerEvents: isRunning ? 'none' : 'auto',
                transition: 'opacity 0.25s ease',
              }}>

              {/* Work column */}
              <div className="flex flex-col items-center gap-3">
                <span style={{ color: WORK_ACCENT, fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>Work</span>
                <div className="flex items-end gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <input type="number" min="0" max="99" value={customMins}
                      onChange={e => setCustomMins(e.target.value)} onBlur={applyCustom}
                      className="w-14 text-center bg-transparent text-gray-100 text-xl focus:outline-none"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }} />
                    <span style={{ color: '#AAAAAA', fontSize: '9px', letterSpacing: '1px' }}>MIN</span>
                  </div>
                  <span className="pb-4 text-xl" style={{ color: '#BBBBBB' }}>:</span>
                  <div className="flex flex-col items-center gap-1">
                    <input type="number" min="0" max="59" value={customSec}
                      onChange={e => setCustomSec(e.target.value)} onBlur={applyCustom}
                      className="w-14 text-center bg-transparent text-gray-100 text-xl focus:outline-none"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }} />
                    <span style={{ color: '#AAAAAA', fontSize: '9px', letterSpacing: '1px' }}>SEC</span>
                  </div>
                </div>
              </div>

              {/* Break column */}
              <div className="flex flex-col items-center gap-3">
                <span style={{ color: BREAK_ACCENT, fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>Break</span>
                <div className="flex items-end gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <input type="number" min="0" max="99" value={customBreakMins}
                      onChange={e => setCustomBreakMins(e.target.value)} onBlur={applyCustom}
                      className="w-14 text-center bg-transparent text-gray-100 text-xl focus:outline-none"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }} />
                    <span style={{ color: '#AAAAAA', fontSize: '9px', letterSpacing: '1px' }}>MIN</span>
                  </div>
                  <span className="pb-4 text-xl" style={{ color: '#BBBBBB' }}>:</span>
                  <div className="flex flex-col items-center gap-1">
                    <input type="number" min="0" max="59" value={customBreakSec}
                      onChange={e => setCustomBreakSec(e.target.value)} onBlur={applyCustom}
                      className="w-14 text-center bg-transparent text-gray-100 text-xl focus:outline-none"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }} />
                    <span style={{ color: '#AAAAAA', fontSize: '9px', letterSpacing: '1px' }}>SEC</span>
                  </div>
                </div>
              </div>

            </div>
          )}

      </div>
      {/* ── End Row 2 ── */}

      {/* ── Row 3: Center zone — 1fr, digits always anchored here ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '8px',
        gap: '8px',
      }}>

          {/* Phase label + digits — tight pair */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs tracking-[6px] uppercase"
              style={{ color: done ? '#F1F5F9' : accent, transition: 'color 0.5s ease' }}>
              {phaseLabel}
            </p>
            <p className={`select-none${flash ? ' timer-flash' : ''}`}
              style={{ fontSize: '88px', lineHeight: 1, letterSpacing: '-2px', fontWeight: 200, fontVariant: 'tabular-nums', color: phase === 'break' ? BREAK_ACCENT : '#F1F5F9', transition: 'color 0.5s ease' }}>
              {fmt(displaySecs)}
            </p>
          </div>

          {/* Controls — play is centered via flexbox; reset is absolute so it never shifts play */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <button
              onClick={isRunning ? stop : start}
              className="focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95">
              {isRunning ? <PauseIcon color={accent} /> : <PlayIcon color={accent} />}
            </button>
            <button
              onClick={reset}
              className="focus:outline-none transition-all duration-200 hover:opacity-60 hover:rotate-[-30deg] active:scale-90"
              style={{
                position: 'absolute',
                left: 'calc(50% + 50px)',
                top: '50%',
                transform: 'translateY(-50%)',
                visibility: atStart && !done ? 'hidden' : 'visible',
              }}>
              <ResetIcon />
            </button>
          </div>

          {/* Status hint / Pomodoro session tracker */}
          <div style={{ minHeight: '44px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {mode === 'pomodoro' ? (
              <>
                {/* 4 session dots */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[0, 1, 2, 3].map(i => {
                    const isDone   = i < pomSession;
                    const isActive = i === pomSession && phase === 'work';
                    return (
                      <div key={i} className={isActive ? 'pomo-dot-pulse' : ''}
                        style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background:  isDone || isActive ? WORK_ACCENT : 'transparent',
                          border:      `1.5px solid ${isDone || isActive ? WORK_ACCENT : 'rgba(255,255,255,0.2)'}`,
                          opacity:     !isDone && !isActive ? 0.4 : 1,
                          transition:  'all 0.4s ease',
                        }} />
                    );
                  })}
                </div>
                {/* Next-state info text */}
                {pomNextInfo && (
                  <p style={{ fontSize: '10px', color: '#AAAAAA', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>
                    {pomNextInfo}
                  </p>
                )}
              </>
            ) : (
              done
                ? <p style={{ color: accent, fontSize: '13px', transition: 'color 0.5s ease' }}>Session complete ✓</p>
                : !isRunning && atStart
                ? <p style={{ color: '#6B7280', fontSize: '12px', letterSpacing: '0.5px' }}>Tap to start</p>
                : null
            )}
          </div>

      </div>
      {/* ── End Row 3 ── */}

      {/* ── BOTTOM: Category section ── */}
      <div style={{ flexShrink: 0, width: '100%', paddingBottom: '2px' }}>

        <p style={{
          fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
          color: '#CCCCCC', textAlign: 'center', marginBottom: '10px',
        }}>
          Focus On
        </p>

        {/* Outer: scroll container only — no flex, no justify */}
        {/* Inner: flex + justify-center with fit-content/min-width trick so:
              desktop (no overflow) → min-width:100% wins → chips centered
              mobile  (overflow)    → fit-content wins   → starts at left edge, scrollable */}
        <div className="scrollbar-none" style={{ overflowX: 'auto', paddingTop: '6px', paddingBottom: '6px' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', paddingLeft: '4px', paddingRight: '4px', width: 'fit-content', minWidth: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
          {(() => {
            const catLocked = phase === 'work' && !atStart;
            return categories.map((c, i) => {
              const isActive   = catIdx === i;
              const isDisabled = catLocked && !isActive;
              return (
                <button
                  key={c.name}
                  onClick={() => !catLocked && setCatIdx(i)}
                  className="flex-shrink-0 focus:outline-none active:opacity-60"
                  style={{
                    fontSize: '12px', whiteSpace: 'nowrap', letterSpacing: '0.3px',
                    padding: '5px 14px', borderRadius: '999px',
                    fontWeight: 500,
                    border: '1px solid transparent',
                    color:       isActive ? c.color                        : '#6B7280',
                    background:  isActive ? `${c.color}18`                 : 'rgba(255,255,255,0.05)',
                    borderColor: isActive ? `${c.color}55`                 : 'rgba(255,255,255,0.1)',
                    boxShadow:   isActive ? `0 0 10px ${c.color}35`        : 'none',
                    opacity:   isDisabled ? 0.25 : 1,
                    cursor:    isDisabled ? 'default' : 'pointer',
                    transition: 'color 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, opacity 0.3s ease',
                  }}>
                  {c.name}
                </button>
              );
            });
          })()}

          {/* ── Add category chip ── */}
          <button
            onClick={() => setCatModalOpen(true)}
            className="flex-shrink-0 focus:outline-none active:opacity-60"
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '12px', whiteSpace: 'nowrap', letterSpacing: '0.3px',
              padding: '5px 12px', borderRadius: '999px',
              fontWeight: 500, border: '1px dashed rgba(100,255,218,0.35)',
              color: '#64FFDA', background: 'rgba(100,255,218,0.05)', cursor: 'pointer',
              transition: 'border-color 0.18s ease, background 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(100,255,218,0.65)'; e.currentTarget.style.background = 'rgba(100,255,218,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(100,255,218,0.35)'; e.currentTarget.style.background = 'rgba(100,255,218,0.05)'; }}>
            <PlusIcon />
          </button>
        </div>
        </div>

      </div>

      <CategoryModal
        isOpen={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
}

/* ─── Dashboard Mock Data ─────────────────────────────────────────── */
const TOTAL_HOURS  = 2145;
const GOAL_HOURS   = 10000;
const STREAK       = 12;
const TODAY_MINS   = 87;
const WEEKLY_HOURS = [3.2, 4.1, 2.8, 5.0, 3.6, 2.5, 1.45];
const WEEK_DAYS    = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SESSIONS = [
  { label: 'Today',     dur: '1h 27m', cat: 'Work',     color: '#64FFDA' },
  { label: 'Today',     dur: '45m',    cat: 'Study',    color: '#A78BFA' },
  { label: 'Yesterday', dur: '2h 10m', cat: 'Work',     color: '#64FFDA' },
  { label: 'Yesterday', dur: '30m',    cat: 'Personal', color: '#F97316' },
  { label: 'Mar 9',     dur: '1h 55m', cat: 'Study',    color: '#A78BFA' },
  { label: 'Mar 8',     dur: '3h 20m', cat: 'Work',     color: '#64FFDA' },
  { label: 'Mar 7',     dur: '2h 05m', cat: 'Work',     color: '#64FFDA' },
];

const CATEGORIES = [
  { name: 'Work',     hours: 1287, pct: 60, color: '#64FFDA' },
  { name: 'Study',    hours:  536, pct: 25, color: '#A78BFA' },
  { name: 'Personal', hours:  322, pct: 15, color: '#F97316' },
];

const ACHIEVEMENTS = [
  { label: 'First Step',    desc: 'First session',      unlocked: true,  prog: 1 },
  { label: '1 Hour Club',   desc: '1 hour logged',      unlocked: true,  prog: 1 },
  { label: '10 Hour Club',  desc: '10 hours logged',    unlocked: true,  prog: 1 },
  { label: '100 Hour Club', desc: '100 hours logged',   unlocked: true,  prog: 1 },
  { label: 'Week Warrior',  desc: '7-day streak',       unlocked: true,  prog: 1 },
  { label: '500 Hour Club', desc: '500 hours logged',   unlocked: true,  prog: 1 },
  { label: 'Iron Will',     desc: '1,000 hours logged', unlocked: true,  prog: 1 },
  { label: '2,500 Club',    desc: '2,500 hours',        unlocked: false, prog: 2145 / 2500 },
  { label: 'Halfway There', desc: '5,000 hours',        unlocked: false, prog: 2145 / 5000 },
  { label: 'The 10K',       desc: '10,000 hours',       unlocked: false, prog: 2145 / 10000 },
];

const SLabel = ({ children }) => (
  <p className="px-4 pt-5 pb-2 text-xs tracking-widest uppercase" style={{ color: '#555' }}>{children}</p>
);

function DashboardView() {
  const pct  = ((TOTAL_HOURS / GOAL_HOURS) * 100).toFixed(1);
  const maxW = Math.max(...WEEKLY_HOURS);
  const BAR_H = 56;

  return (
    <div className="pb-4">
      <div className="flex gap-3 px-4 pt-4">
        <div className="flex-1 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default" style={{ background: '#FFFFFF', border: '1px solid #E8E8E8' }}>
          <p className="text-gray-900 font-light" style={{ fontSize: '32px', lineHeight: 1, letterSpacing: '-1px' }}>{TOTAL_HOURS.toLocaleString()}</p>
          <p className="mt-1 text-xs" style={{ color: '#555' }}>hours focused</p>
        </div>
        <div className="flex-1 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default" style={{ background: '#FFFFFF', border: '1px solid #E8E8E8' }}>
          <p className="font-light" style={{ fontSize: '32px', lineHeight: 1, letterSpacing: '-1px', color: '#64FFDA' }}>🔥 {STREAK}</p>
          <p className="mt-1 text-xs" style={{ color: '#555' }}>day streak</p>
        </div>
      </div>
      <SLabel>Journey to 10K</SLabel>
      <div className="px-4">
        <div className="flex justify-between items-center mb-2">
          <span style={{ color: '#888', fontSize: '12px' }}>{TOTAL_HOURS.toLocaleString()} / {GOAL_HOURS.toLocaleString()} hrs</span>
          <span style={{ color: '#64FFDA', fontSize: '12px', fontWeight: 600 }}>{pct}%</span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: '6px', background: '#EEEEEE' }}>
          <div className="h-full rounded-full" style={{ width: pct + '%', background: 'linear-gradient(90deg, #64FFDA, #A78BFA)' }} />
        </div>
      </div>
      <SLabel>This Week</SLabel>
      <div className="px-4">
        <div className="flex items-end justify-between gap-1">
          {WEEKLY_HOURS.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5" style={{ flex: 1 }}>
              <span style={{ color: '#555', fontSize: '10px' }}>{h.toFixed(1)}</span>
              <div className="w-full rounded-sm" style={{ height: Math.round((h / maxW) * BAR_H) + 'px', background: i === 6 ? '#CCCCCC' : '#64FFDA', opacity: i === 6 ? 0.5 : 0.8, minHeight: '4px' }} />
              <span style={{ color: '#555', fontSize: '10px' }}>{WEEK_DAYS[i]}</span>
            </div>
          ))}
        </div>
        <p className="mt-3" style={{ color: '#555', fontSize: '12px' }}>
          <span style={{ color: '#64FFDA' }}>{TODAY_MINS} min</span> focused today
        </p>
      </div>
      <SLabel>Recent</SLabel>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', marginInline: '16px', overflow: 'hidden', border: '1px solid #E8E8E8' }}>
        {SESSIONS.map((s, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: i < SESSIONS.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span style={{ color: '#111111', fontSize: '14px' }}>{s.cat}</span>
              <span style={{ color: '#AAAAAA', fontSize: '12px' }}>{s.label}</span>
            </div>
            <span style={{ color: '#888', fontSize: '13px', fontVariant: 'tabular-nums' }}>{s.dur}</span>
          </div>
        ))}
      </div>
      <SLabel>By Category</SLabel>
      <div className="px-4 space-y-3">
        {CATEGORIES.map(c => (
          <div key={c.name}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span style={{ color: '#111111', fontSize: '13px' }}>{c.name}</span>
              </div>
              <span style={{ color: '#555', fontSize: '12px' }}>{c.hours.toLocaleString()} hrs · {c.pct}%</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: '3px', background: '#EEEEEE' }}>
              <div className="h-full rounded-full" style={{ width: c.pct + '%', background: c.color }} />
            </div>
          </div>
        ))}
      </div>
      <SLabel>Achievements</SLabel>
      <div className="px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3" style={{ width: 'max-content' }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="flex flex-col justify-between rounded-xl p-3 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              style={{ width: '112px', height: '120px', flexShrink: 0, background: '#FFFFFF', border: `1px solid ${a.unlocked ? 'rgba(0,180,150,0.25)' : '#E8E8E8'}` }}>
              <div>
                {a.unlocked ? <CheckIcon /> : <span style={{ color: '#BBBBBB', fontSize: '14px' }}>○</span>}
                <p className="mt-2 leading-tight" style={{ color: a.unlocked ? '#111111' : '#AAAAAA', fontSize: '12px', fontWeight: 600 }}>{a.label}</p>
                <p className="mt-0.5 leading-tight" style={{ color: '#BBBBBB', fontSize: '10px' }}>{a.desc}</p>
              </div>
              {!a.unlocked && (
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '3px', background: '#EEEEEE' }}>
                  <div style={{ width: (a.prog * 100).toFixed(1) + '%', height: '100%', background: '#64FFDA' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tasks ───────────────────────────────────────────────────────── */
function TasksView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="h-px w-16" style={{ background: '#64FFDA' }} />
      <p className="text-gray-900 text-sm">Tasks</p>
      <p style={{ color: '#555', fontSize: '13px' }}>Coming soon</p>
    </div>
  );
}

/* ─── Settings ────────────────────────────────────────────────────── */
function SettingsView({ aiCoach, setAiCoach, notifications, setNotifications, onAbout, onPrivacy }) {
  const SectionLabel = ({ children }) => (
    <p className="px-4 pt-5 pb-2 text-xs tracking-widest uppercase" style={{ color: '#555' }}>{children}</p>
  );
  const Row = ({ children, last }) => (
    <div className="flex items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-gray-50" style={{ borderBottom: last ? 'none' : '1px solid #F0F0F0' }}>
      {children}
    </div>
  );
  const Label = ({ children, sub }) => (
    <div>
      <p style={{ color: '#111111', fontSize: '15px' }}>{children}</p>
      {sub && <p style={{ color: '#555', fontSize: '12px', marginTop: '1px' }}>{sub}</p>}
    </div>
  );
  return (
    <div className="pb-2">
      <SectionLabel>Account</SectionLabel>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', marginInline: '16px', overflow: 'hidden', border: '1px solid #E8E8E8' }}>
        <Row>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm" style={{ background: '#64FFDA', color: '#0D0D0D' }}>D</div>
            <Label sub="daniel@example.com">Daniel</Label>
          </div>
          <ChevronRightIcon />
        </Row>
        <Row last><span style={{ color: '#FF6B6B', fontSize: '15px' }}>Sign Out</span></Row>
      </div>
      <SectionLabel>Preferences</SectionLabel>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', marginInline: '16px', overflow: 'hidden', border: '1px solid #E8E8E8' }}>
        <Row><Label sub="Personalized focus recommendations">Enable AI Coach</Label><Toggle on={aiCoach} onToggle={() => setAiCoach(v => !v)} /></Row>
        <Row last><Label>Notifications</Label><Toggle on={notifications} onToggle={() => setNotifications(v => !v)} /></Row>
      </div>
      <SectionLabel>Legal</SectionLabel>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', marginInline: '16px', overflow: 'hidden', border: '1px solid #E8E8E8' }}>
        <Row>
          <span style={{ color: '#111111', fontSize: '15px' }}>About Focus10K</span>
          <button onClick={onAbout} className="flex items-center gap-1 transition-all duration-200 hover:opacity-70 active:scale-95" style={{ color: '#64FFDA', fontSize: '13px' }}>View <ChevronRightIcon /></button>
        </Row>
        <Row last>
          <span style={{ color: '#111111', fontSize: '15px' }}>Privacy Policy</span>
          <button onClick={onPrivacy} className="flex items-center gap-1 transition-all duration-200 hover:opacity-70 active:scale-95" style={{ color: '#64FFDA', fontSize: '13px' }}>View <ChevronRightIcon /></button>
        </Row>
      </div>
      <p className="text-center py-6 text-xs" style={{ color: '#BBBBBB' }}>Focus10K v1.0.0</p>
    </div>
  );
}

/* ─── Bottom Nav ──────────────────────────────────────────────────── */
const TABS = [
  { id: 'timer',     label: 'Timer',     Icon: TimerIcon },
  { id: 'dashboard', label: 'Dashboard', Icon: DashIcon  },
  { id: 'tasks',     label: 'Tasks',     Icon: TaskIcon  },
  { id: 'settings',  label: 'Settings',  Icon: GearIcon  },
];

/* Fix 3: Fixed elements use left-1/2 -translate-x-1/2 w-full max-w-2xl to
   match the responsive container width */
function BottomNav({ active, onSelect }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl flex"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.07)', height: '64px', zIndex: 40 }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => onSelect(id)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 relative focus:outline-none transition-all duration-200 active:scale-95 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}>
            {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full" style={{ width: '28px', height: '2px', background: '#64FFDA' }} />}
            <Icon active={isActive} />
            <span style={{ fontSize: '10px', color: isActive ? '#FFFFFF' : '#555555', letterSpacing: '0.3px' }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function AdBanner() {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-2xl flex items-center justify-center"
      style={{ bottom: '64px', height: '50px', background: '#FFFFFF', borderTop: '1px solid #E8E8E8', zIndex: 40 }}>
      <span style={{ color: '#BBBBBB', fontSize: '11px', letterSpacing: '1px' }}>ADS (NATIVE / DARK MODE)</span>
    </div>
  );
}

const PAGE_TITLES = { timer: 'Focus', dashboard: 'Dashboard', tasks: 'Tasks', settings: 'Settings' };

function Header({ activeTab }) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl flex items-center justify-between px-4 sm:px-6"
      style={{ height: '56px', background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)', zIndex: 50 }}>
      <span className="font-semibold text-white" style={{ fontSize: '17px' }}>{PAGE_TITLES[activeTab]}</span>
      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#64FFDA', color: '#0D0D0D', fontSize: '14px', fontWeight: '700' }}>D</div>
    </header>
  );
}

/* ─── App ─────────────────────────────────────────────────────────── */
export default function App() {
  const [activeTab,     setActiveTab]     = useState('timer');
  const [aboutOpen,     setAboutOpen]     = useState(false);
  const [privacyOpen,   setPrivacyOpen]   = useState(false);
  const [aiCoach,       setAiCoach]       = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [categories, setCategories] = useState(() => {
    try { return JSON.parse(localStorage.getItem('focus10k_categories')) || DEFAULT_CATS; }
    catch { return DEFAULT_CATS; }
  });
  useEffect(() => {
    localStorage.setItem('focus10k_categories', JSON.stringify(categories));
  }, [categories]);

  return (
    /* Fix 3: fluid container — max-w-2xl on desktop, full-width on mobile */
    <div className="relative w-full max-w-2xl mx-auto" style={{ height: '100dvh', background: '#0a0a0a', overflow: 'hidden' }}>
      <Header activeTab={activeTab} />

      {/* Scrollable content inset between header (56px) and ad+nav (114px) */}
      <div key={activeTab} className="tab-enter" style={{ position: 'absolute', top: '56px', bottom: '114px', left: 0, right: 0, overflowY: activeTab === 'timer' ? 'hidden' : 'auto', background: '#0a0a0a' }}>
        {activeTab === 'timer'     && <TimerView categories={categories} setCategories={setCategories} />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'tasks'     && <TasksView />}
        {activeTab === 'settings'  && (
          <SettingsView
            aiCoach={aiCoach}             setAiCoach={setAiCoach}
            notifications={notifications} setNotifications={setNotifications}
            onAbout={() => setAboutOpen(true)}
            onPrivacy={() => setPrivacyOpen(true)}
          />
        )}
      </div>

      <AdBanner />
      <BottomNav active={activeTab} onSelect={setActiveTab} />

      <Modal isOpen={aboutOpen}   onClose={() => setAboutOpen(false)}   title="About Focus10K"><AboutContent /></Modal>
      <Modal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy Policy"><PrivacyContent /></Modal>
    </div>
  );
}
