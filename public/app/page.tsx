lient';

import React, { useState, useEffect } from 'react';
import {
  Fuel, Trophy, CheckCircle2, Ticket, Share2, Trash2, CloudRain,
  X, Volume2, Square, Eye, Type, LayoutList, Train, Pill,
  Bell, MapPin, Navigation
} from 'lucide-react';

interface Offer {
  postcode_prefix: string;
  tier: number;
  business_name: string;
  offer_headline: string;
  promo_code: string;
  affiliate_url?: string;
}

const CITY_PRESETS: Record<string, {
  city: string;
  council: string;
  badge: string;
  accentName: string;
  greetingLocal: string;
  greetingClear: string;
  fuelPrice: number;
  fuelStation: string;
  club: string;
  clubStat: string;
  trafficSummary: string;
  trafficAlerts: string[];
  busLine: string;
  railStation: string;
  newsItems: string[];
  pollQuestion: string;
  offer?: Offer;
}> = {
  WV4: {
    city: 'Wolverhampton',
    council: 'City of Wolverhampton Council',
    badge: 'Proper Yam Yam',
    accentName: 'Black Country / West Mids',
    greetingLocal: "Ay up WV4! Here's your Black Country SocialPorch brief for Tuesday.",
    greetingClear: 'Good morning WV4. Here is your Wolverhampton SocialPorch local briefing.',
    fuelPrice: 155.6,
    fuelStation: 'Blakenhall Service Station (WV2)',
    club: 'Wolves FC',
    clubStat: '4th in Championship (28 pts • 1 pt off 1st) • Next: vs Charlton (Sat Nov 21)',
    trafficSummary: 'Broad St closed; A449 Penn Rd moving well',
    trafficAlerts: [
      'Broad Street (WV1): Closed for Network Rail bridge works — buses diverted via Ring Rd.',
      'A449 Penn Road & Warstones Rd (WV4): Flowing freely this morning.',
      'M54 J1–J2: Normal daytime flow (overnight closures 21:00–06:00).',
    ],
    busLine: 'NXWM 6 → City Centre (Due in 4 mins)',
    railStation: 'Wolverhampton Station (WV1)',
    newsItems: [
      'Broad Street bridge diversion active today; Metro & M54 running smoothly.',
      'UK E10 petrol drops 8.9p/L over past month — cheapest near WV4 is 155.6p.',
      'Bright & crisp across Wolverhampton today (6°C) after overnight frost.',
    ],
    pollQuestion: 'Did you have to de-ice the car in WV4 this morning?',
    offer: {
      postcode_prefix: 'WV4',
      tier: 1,
      business_name: 'Penn & Merry Hill Coffee Roasters',
      offer_headline: 'Free Pastry with Any Morning Coffee Before 10:30 AM',
      promo_code: 'WV4MORNING',
    },
  },
  M1: {
    city: 'Manchester',
    council: 'Manchester City Council',
    badge: 'Mancunian Mover',
    accentName: 'Mancunian / North West',
    greetingLocal: "Morning our kid! Here's your Mancunian SocialPorch update for M1.",
    greetingClear: 'Good morning M1. Here is your Manchester SocialPorch local briefing.',
    fuelPrice: 158.9,
    fuelStation: 'Asda Hulme Superstore (M15)',
    club: 'Man City & Man Utd',
    clubStat: 'Premier League Derby Watch • Metrolink Good Service across all zones',
    trafficSummary: 'Mancunian Way steady; Deansgate works',
    trafficAlerts: [
      'Deansgate & Princess St (M1): Minor lane restrictions for utility works.',
      'Mancunian Way (A57M): Moving steadily in both directions.',
      'Metrolink Trams: Good service across all Manchester lines.',
    ],
    busLine: 'Bee Network 43 → Piccadilly (Due in 3 mins)',
    railStation: 'Manchester Piccadilly (M1)',
    newsItems: [
      'Metrolink trams running on time across all Manchester zones this morning.',
      'Cheapest unleaded near M1 is 158.9p/L at Asda Hulme (6.4p below UK avg).',
      'Crisp sunshine in Manchester today (6°C) with light winds.',
    ],
    pollQuestion: 'Are you commuting by tram or car in M1 today?',
    offer: {
      postcode_prefix: 'M1',
      tier: 1,
      business_name: 'Northern Quarter Espresso',
      offer_headline: '£2.50 Artisan Flat White Before 10:00 AM',
      promo_code: 'M1BREW',
    },
  },
  G1: {
    city: 'Glasgow',
    council: 'Glasgow City Council',
    badge: 'Glaswegian Legend',
    accentName: 'Scottish / Glasgow',
    greetingLocal: "Hullo Glasgow! Here's your G1 SocialPorch update for Tuesday.",
    greetingClear: 'Good morning G1. Here is your Glasgow SocialPorch local briefing.',
    fuelPrice: 161.4,
    fuelStation: 'Morrisons Gallowgate (G40)',
    club: 'Celtic & Rangers',
    clubStat: 'Scottish Premiership Title Race • Subway Inner/Outer Circle Normal',
    trafficSummary: 'M8 Kingston Bridge steady; Subway normal',
    trafficAlerts: [
      'M8 Kingston Bridge: Steady volume, no major incidents reported.',
      'Argyle Street & George Square (G1): Normal city-centre bus flow.',
      'Glasgow Subway: Inner & Outer circles operating on time.',
    ],
    busLine: 'First Glasgow 2 → George Square (Due in 5 mins)',
    railStation: 'Glasgow Central (G1)',
    newsItems: [
      'Glasgow Subway Inner & Outer circles operating a normal service.',
      'Cheapest E10 petrol near G1 is 161.4p/L at Morrisons Gallowgate.',
      'Cold, bright morning in Glasgow (5°C) — wrap up warm.',
    ],
    pollQuestion: 'Grabbing a hot roll or coffee on the way in today?',
  },
  SW1A: {
    city: 'London',
    council: 'Westminster City Council',
    badge: 'Capital Commuter',
    accentName: 'London / South East',
    greetingLocal: "Morning London! Here's your SW1A SocialPorch brief before you head out.",
    greetingClear: 'Good morning SW1A. Here is your Westminster local briefing.',
    fuelPrice: 162.8,
    fuelStation: 'Tesco Kennington (SE11)',
    club: 'Chelsea & Arsenal',
    clubStat: 'London Premier League Tracker • Victoria & Jubilee Lines Good Service',
    trafficSummary: 'Embankment moving; Tube good service',
    trafficAlerts: [
      'Victoria Embankment & Whitehall (SW1A): Traffic moving well.',
      'Victoria, Jubilee & District Lines: Good service across Central London.',
      'Congestion Charge: Active 07:00–18:00 today.',
    ],
    busLine: 'TfL Bus 24 → Pimlico / Camden (Due in 2 mins)',
    railStation: 'London Victoria (SW1V)',
    newsItems: [
      'Victoria, Jubilee & District Tube lines reporting a good service.',
      'Cheapest E10 near SW1A is 162.8p/L at Tesco Kennington.',
      'Bright & chilly morning across Central London (7°C).',
    ],
    pollQuestion: 'How was your Tube or bus run into Central London today?',
  },
};

const INITIAL_LEADERBOARD = [
  { code: 'M1', city: 'Manchester', xp: 14820 },
  { code: 'WV4', city: 'Wolverhampton', xp: 14790 },
  { code: 'B1', city: 'Birmingham', xp: 14510 },
  { code: 'SW1A', city: 'London', xp: 13940 },
  { code: 'G1', city: 'Glasgow', xp: 13620 },
];

const BLOCK_SHAPES = [
  { id: 'single', name: '1x1 Tile', cells: [[0, 0]] },
  { id: 'bar3', name: '1x3 Bar', cells: [[0, 0], [0, 1], [0, 2]] },
  { id: 'square2', name: '2x2 Box', cells: [[0, 0], [0, 1], [1, 0], [1, 1]] },
];

function EmeraldPorchLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <rect width="128" height="128" rx="28" fill="#064E3B" />
      <rect x="4" y="4" width="120" height="120" rx="24" stroke="#10B981" strokeWidth="5" />
      <path d="M24 54L64 24L104 54" stroke="#34D399" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="42" y="50" width="44" height="54" rx="6" fill="#10B981" />
      <path d="M42 50L70 57V97L42 104V50Z" fill="#064E3B" />
      <circle cx="63" cy="77" r="3.5" fill="#A7F3D0" />
      <rect x="34" y="104" width="60" height="7" rx="3.5" fill="#34D399" />
    </svg>
  );
}

export default function SocialPorchApp() {
  const [activeTab, setActiveTab] = useState<'today' | 'fuel' | 'arcade' | 'sport'>('today');
  const [singlePageMode, setSinglePageMode] = useState(false);
  const [showA11yDrawer, setShowA11yDrawer] = useState(false);
  const [showPostcodeSwitcher, setShowPostcodeSwitcher] = useState(false);

  // AAA Accessibility Controls
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [localAccentMode, setLocalAccentMode] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [teleprompterLine, setTeleprompterLine] = useState(0);
  const [visualBanner, setVisualBanner] = useState('Tuesday Brief Ready • Tap any item below for XP');

  // Location & Postcode State (GPS OFF by default; optional 1-tap Near Me)
  const [postcodeInput, setPostcodeInput] = useState('WV4');
  const [activePostcode, setActivePostcode] = useState('WV4');
  const [locatingGps, setLocatingGps] = useState(false);
  const [activeOffer, setActiveOffer] = useState<Offer>(CITY_PRESETS.WV4.offer!);

  // Open Today's Porch Door & Daily Progress
  const [userXp, setUserXp] = useState(240);
  const [porchDoorOpen, setPorchDoorOpen] = useState(false);
  const [parcelOpened, setParcelOpened] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [pollVote, setPollVote] = useState<null | 'yes' | 'no'>(null);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

  // Utilities & Live Traffic State
  const [streetBinDay, setStreetBinDay] = useState('Tuesday');
  const [streetBinColour, setStreetBinColour] = useState('Blue Recycling + Food');
  const [fuelGuess, setFuelGuess] = useState(160.0);
  const [fuelRevealed, setFuelRevealed] = useState(false);
  const [neighborTrafficReports, setNeighborTrafficReports] = useState<string[]>([]);
  const [trafficNoteInput, setTrafficNoteInput] = useState('');

  // Focused 2-Game Arcade (Block Blast + Postcode Wordle)
  const [arcadeGame, setArcadeGame] = useState<'block' | 'wordle'>('block');
  const [grid, setGrid] = useState<number[][]>(() => Array.from({ length: 6 }, () => Array(6).fill(0)));
  const [selectedPieceIdx, setSelectedPieceIdx] = useState(0);
  const [blockScore, setBlockScore] = useState(0);
  const [wordGuess, setWordGuess] = useState('');
  const [wordGuesses, setWordGuesses] = useState<string[]>([]);

  // Modals
  const [activeModal, setActiveModal] = useState<
Use code with caution.
null | 'voucher' | 'traffic' | 'bins' | 'pharmacy' | 'sponsor' | 'install' | 'alerts' | 'privacy'
(null);
const [liveClock, setLiveClock] = useState('');
const [sponsorForm, setSponsorForm] = useState({ name: '', headline: '', code: '' });
const [alertEmail, setAlertEmail] = useState('');
const [alertSaved, setAlertSaved] = useState(false);
const cityData = CITY_PRESETS[activePostcode] || {
city: activePostcode,
council: ${activePostcode} Local Authority,
badge: 'UK Local Legend',
accentName: 'British Regional',
greetingLocal: Morning ${activePostcode}! Here's your SocialPorch brief for Tuesday.,
greetingClear: Good morning ${activePostcode}. Here is your SocialPorch local briefing.,
fuelPrice: 161.5,
fuelStation: Top Forecourt near ${activePostcode} (GOV.UK Feed),
club: ${activePostcode} Local XI,
clubStat: 'Live UK Matchday & Local Sports Tracker',
trafficSummary: Main routes in ${activePostcode} moving smoothly,
trafficAlerts: [
Main A-roads & high streets in ${activePostcode} reporting normal flow.,
Local rail & bus services operating to schedule.,
],
busLine: Local Express → ${activePostcode} Centre (Due in 5 mins),
railStation: ${activePostcode} Central Rail,
newsItems: [
Local roads & rail services near ${activePostcode} running smoothly this morning.,
UK E10 petrol drops 8.9p/L over past month — cheapest near ${activePostcode} is 161.5p.,
Crisp, bright Tuesday across ${activePostcode} after overnight frost.,
],
pollQuestion: Did you have to de-ice the car in ${activePostcode} this morning?,
};
useEffect(() => {
const t = setInterval(() => setLiveClock(new Date().toLocaleTimeString('en-GB')), 1000);
return () => clearInterval(t);
}, []);
const announce = (msg: string) => setVisualBanner(msg);
const awardXp = (pts: number, reason: string) => {
setUserXp((x) => x + pts);
setLeaderboard((prev) =>
prev
.map((r) => (r.code === activePostcode ? { ...r, xp: r.xp + pts } : r))
.sort((a, b) => b.xp - a.xp)
);
announce(🎉 +${pts} XP • ${reason});
};
const switchPostcode = (raw: string) => {
const clean = raw.trim().toUpperCase() || 'WV4';
setActivePostcode(clean);
setPostcodeInput(clean);
setFuelRevealed(false);
setCheckedItems([]);
setPollVote(null);
setNeighborTrafficReports([]);
setShowPostcodeSwitcher(false);
const preset = CITY_PRESETS[clean];
if (preset?.offer) {
setActiveOffer(preset.offer);
} else {
setActiveOffer({
postcode_prefix: clean,
tier: 2,
business_name: 'UK MoneySaver Auto & Home (Partner)',
offer_headline: Compare Car Insurance in ${clean} — Drivers Save Avg £242/yr,
promo_code: 'UKPORCH240',
affiliate_url: 'awin1.com',
});
}
announce(Switched to ${clean} (${preset?.city || clean}));
};
const detectPostcodeFromGPS = () => {
if (typeof window === 'undefined' || !('geolocation' in navigator)) {
announce('GPS not available — please type your UK postcode.');
return;
}
setLocatingGps(true);
announce('📍 Finding your nearest UK postcode...');
navigator.geolocation.getCurrentPosition(
async (pos) => {
try {
const { latitude, longitude } = pos.coords;
const res = await fetch(
https://postcodes.io{longitude}&lat=${latitude}&limit=1
);
const data = await res.json();
const nearest = data?.result?.[0]?.outcode || 'WV4';
switchPostcode(nearest);
} catch {
announce('Could not look up GPS — enter your postcode manually.');
} finally {
setLocatingGps(false);
}
},
() => {
setLocatingGps(false);
announce('Location off — type any UK postcode anytime.');
}
);
};
// Teleprompter + Natural Regional Speech Narrator
const teleprompterLines = [
localAccentMode ? cityData.greetingLocal : cityData.greetingClear,
...cityData.newsItems,
Traffic update: ${cityData.trafficSummary}. Cheapest unleaded near ${activePostcode} is ${cityData.fuelPrice}p.,
];
useEffect(() => {
if (!isReading) return;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
window.speechSynthesis.cancel();
const utter = new SpeechSynthesisUtterance(teleprompterLines[teleprompterLine]);
const voices = window.speechSynthesis.getVoices();
const ukVoice =
voices.find((v) => v.lang === 'en-GB' && /Natural|Libby|Sonia|Google UK/i.test(v.name)) ||
voices.find((v) => v.lang.startsWith('en-GB'));
if (ukVoice) utter.voice = ukVoice;
utter.rate = 0.96;
window.speechSynthesis.speak(utter);
}
const timer = setTimeout(() => {
setTeleprompterLine((line) => {
if (line + 1 < teleprompterLines.length) return line + 1;
setIsReading(false);
return 0;
});
}, 3800);
return () => clearTimeout(timer);
}, [isReading, teleprompterLine, activePostcode, localAccentMode]);
// Block Blast Placement Logic
const handlePlaceBlock = (r: number, c: number) => {
const piece = BLOCK_SHAPES[selectedPieceIdx];
const fits = piece.cells.every(([dr, dc]) => {
const nr = r + dr;
const nc = c + dc;
return nr >= 0 && nr < 6 && nc >= 0 && nc < 6 && grid[nr][nc] === 0;
});
if (!fits) {
announce('⚠️ Piece does not fit there — pick another square!');
return;
}
const next = grid.map((row) => [...row]);
piece.cells.forEach(([dr, dc]) => {
next[r + dr][c + dc] = 1;
});
let cleared = 0;
const fullRows = next.map((row) => row.every((cell) => cell === 1));
const fullCols = Array.from({ length: 6 }, (_, colIdx) =>
next.every((row) => row[colIdx] === 1)
);
fullRows.forEach((isFull, ri) => {
if (isFull) {
cleared++;
next[ri] = Array(6).fill(0);
}
});
fullCols.forEach((isFull, ci) => {
if (isFull) {
cleared++;
next.forEach((row) => (row[ci] = 0));
}
});
setGrid(next);
setSelectedPieceIdx((i) => (i + 1) % BLOCK_SHAPES.length);
const pts = piece.cells.length * 10 + cleared * 50;
setBlockScore((s) => s + pts);
if (cleared > 0) {
awardXp(25 * cleared, Block Blast ${cleared}x Line Clear!);
} else {
announce(Placed ${piece.name} (+${pts} pts));
}
};
const toggleNewsCheck = (idx: number) => {
if (checkedItems.includes(idx)) return;
const next = [...checkedItems, idx];
setCheckedItems(next);
if (next.length === cityData.newsItems.length) {
awardXp(40, 'Completed Full Morning Brief (+30 XP Bonus)!');
} else {
awardXp(10, 'Checked off update');
}
};
// AAA Styling Helpers
const shellBg = highContrast ? 'bg-black text-white' : 'bg-slate-950 text-slate-100';
const cardCls = highContrast
? 'bg-black border-2 border-yellow-400 text-white rounded-2xl'
: 'bg-slate-900/95 border border-slate-800 text-slate-100 rounded-2xl shadow-lg';
const btnPrimary = highContrast
? 'bg-yellow-400 text-black font-extrabold border-2 border-white'
: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold';
const tapSize = largeText ? 'min-h-[52px] text-base px-4 py-3' : 'min-h-[42px] text-xs px-3 py-2';
const textScale = largeText ? 'text-base' : 'text-xs';
return (
<div className={min-h-screen ${shellBg} pb-10 font-sans}>
{/* STREAMLINED HEADER WITH EMERALD GREEN PORCH LOGO */}
SocialPorch
<button
onClick={() => setShowPostcodeSwitcher((s) => !s)}
aria-expanded={showPostcodeSwitcher}
aria-label={Active postcode ${activePostcode}. Tap to switch postcode or use Near Me GPS}
className={px-2.5 py-1 rounded-xl text-xs font-extrabold border flex items-center gap-1 ${ highContrast ? 'bg-yellow-400 text-black border-white' : 'bg-slate-800 border-slate-700 text-emerald-300' }}
>
 {activePostcode} ▾

<button
onClick={() => setShowA11yDrawer((a) => !a)}
aria-expanded={showA11yDrawer}
aria-label="Open Voice and Accessibility Settings"
className={px-2.5 py-1.5 rounded-xl text-xs font-extrabold border ${ showA11yDrawer || highContrast || largeText ? 'bg-yellow-400 text-black border-white' : 'bg-slate-800 border-slate-700 text-slate-200' }}
>
♿ Voice & Aa+

<button
onClick={() => setActiveModal('alerts')}
aria-label="Save streak and turn on free phone alerts"
className={px-2.5 py-1.5 rounded-xl text-xs font-bold border ${ highContrast ? 'border-yellow-400 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-200' }}
>


<div className={px-2.5 py-1.5 rounded-xl font-extrabold text-xs ${highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}}>
⚡ {userXp}


{/* COLLAPSIBLE POSTCODE & OPTIONAL "NEAR ME" SWITCHER */}
{showPostcodeSwitcher && (


<form
onSubmit={(e) => {
e.preventDefault();
switchPostcode(postcodeInput);
}}
className="flex gap-1.5 flex-1"
>
<input
aria-label="Enter UK Postcode"
value={postcodeInput}
onChange={(e) => setPostcodeInput(e.target.value.toUpperCase())}
placeholder="Postcode (e.g. WV4, M1)"
className={w-full rounded-xl px-3 py-1.5 text-xs font-bold uppercase ${highContrast ? 'bg-black border-2 border-yellow-400 text-white' : 'bg-slate-800 border border-slate-700 text-white'}}
/>
<button type="submit" className={${btnPrimary} rounded-xl px-3 text-xs}>
Go


<button
type="button"
onClick={detectPostcodeFromGPS}
disabled={locatingGps}
aria-label="Use phone GPS to detect nearest UK postcode"
className={rounded-xl px-3 py-1.5 text-xs font-extrabold border flex items-center gap-1 whitespace-nowrap ${ highContrast ? 'border-yellow-400 text-yellow-300' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' }}
>
 {locatingGps ? 'Finding...' : 'Near Me'}



{['WV4', 'M1', 'G1', 'SW1A', 'NG1'].map((pc) => (
<button
key={pc}
onClick={() => switchPostcode(pc)}
className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 border border-slate-700 text-slate-200"
>
{pc}

))}


)}
{/* COLLAPSIBLE AAA ACCESSIBILITY & VOICE DRAWER */}
{showA11yDrawer && (

<button
onClick={() => {
setIsReading((r) => !r);
setTeleprompterLine(0);
}}
aria-pressed={isReading}
className={flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold border ${ isReading ? 'bg-emerald-500 text-black border-white' : 'bg-slate-800 text-slate-200 border-slate-700' }}
>
{isReading ?  : }
{isReading ? 'Stop' : 'Read Aloud'}
<button
onClick={() => setLocalAccentMode((m) => !m)}
className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold border bg-slate-800 border-slate-700 text-emerald-300"
>
{localAccentMode ? 🎙️ ${cityData.accentName} : '📻 Clear UK Voice'}
<button
onClick={() => setHighContrast((h) => !h)}
aria-pressed={highContrast}
className={flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold border ${ highContrast ? 'bg-yellow-400 text-black border-white' : 'bg-slate-800 text-slate-200 border-slate-700' }}
>
 Aa+
<button
onClick={() => setLargeText((t) => !t)}
aria-pressed={largeText}
className={flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold border ${ largeText ? 'bg-yellow-400 text-black border-white' : 'bg-slate-800 text-slate-200 border-slate-700' }}
>
 Text+
<button
onClick={() => setSinglePageMode((s) => !s)}
aria-pressed={singlePageMode}
className={flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold border ${ singlePageMode ? 'bg-yellow-400 text-black border-white' : 'bg-slate-800 text-slate-200 border-slate-700' }}
>
 {singlePageMode ? 'Tabbed' : 'All-in-One'}


)}

{/* VISUAL FLASH BANNER */}
<div
role="status"
aria-live="polite"
className={px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${ highContrast ? 'bg-yellow-400 text-black border-2 border-white' : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-200' }}
>
{visualBanner}
{cityData.badge}
{/* LIVE KARAOKE TELEPROMPTER PLAYER */}
{isReading && (
<div className={${cardCls} p-3.5 space-y-1.5 border-emerald-400}>

🎙️ Reading • {localAccentMode ? cityData.accentName : 'Clear UK Voice'}
<button onClick={() => setIsReading(false)} className="underline">Stop

{teleprompterLines[teleprompterLine]}

)}
{/* 4 COMPACT BENTO TABS */}
{!singlePageMode && (

{[
{ id: 'today', label: '🏠 Today' },
{ id: 'fuel', label: '⛽ Fuel' },
{ id: 'arcade', label: '🎮 Arcade' },
{ id: 'sport', label: '⚽ Sport' },
].map((tab) => (
<button
key={tab.id}
role="tab"
aria-selected={activeTab === tab.id}
onClick={() => setActiveTab(tab.id as any)}
className={${tapSize} rounded-xl font-extrabold text-center border transition ${ activeTab === tab.id ? btnPrimary : highContrast ? 'bg-black text-white border-yellow-400' : 'bg-slate-900 text-slate-300 border-slate-800' }}
>
{tab.label}

))}

)}
{/* ================= TAB 1: TODAY ================= */}
{(singlePageMode || activeTab === 'today') && (
{/* 1. TODAY'S 30-SECOND NEWS BRIEF & TAP-TO-CLEAR CHECKLIST */}
<div className={${cardCls} p-3.5 space-y-2.5}>


🗞️ Today in {cityData.city} ({activePostcode})
Tap each update as you read (+10 XP each)

<button
onClick={() => {
setIsReading((r) => !r);
setTeleprompterLine(0);
}}
aria-label="Listen to today's local news brief aloud"
className={px-2.5 py-1.5 rounded-xl text-xs font-extrabold border ${ highContrast ? 'border-yellow-400 text-yellow-300' : 'bg-slate-800 border-slate-700 text-emerald-300' }}
>
🔊 Listen

{cityData.newsItems.map((item, idx) => {
const done = checkedItems.includes(idx);
return (
<button
key={idx}
onClick={() => toggleNewsCheck(idx)}
aria-pressed={done}
className={w-full text-left p-2.5 rounded-xl border flex items-start justify-between gap-2 transition ${ done ? highContrast ? 'bg-yellow-400 text-black border-white font-bold' : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200' : highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-slate-800/70 border-slate-700/80 text-slate-200' }}
>
<span className={${textScale} leading-snug}>{item}

{done ? '✓' : '+10 XP'}


);
})}
{/* LIVE NEIGHBOURHOOD PULSE POLL */}

📊 {cityData.pollQuestion}
{!pollVote ? (

<button
onClick={() => {
setPollVote('yes');
awardXp(20, 'Voted in local pulse poll');
}}
className={${tapSize} rounded-xl border border-slate-700 bg-slate-800 font-bold}
>
Yes (+20 XP)

<button
onClick={() => {
setPollVote('no');
awardXp(20, 'Voted in local pulse poll');
}}
className={${tapSize} rounded-xl border border-slate-700 bg-slate-800 font-bold}
>
No (+20 XP)


) : (

✓ Live {activePostcode} Result: 68% Yes • 32% No

)}

{/* 2. OPEN TODAY'S PORCH DOOR */}
<div className={${cardCls} p-3.5 space-y-2.5}>


🚪 Open Today's Porch Door

{porchDoorOpen ? '🔥 2x Streak Boost Active • Day 3: +100 XP' : 'Swing open Tuesday’s door for +50 XP'}


<button
disabled={porchDoorOpen}
onClick={() => {
setPorchDoorOpen(true);
awardXp(50, "Opened Tuesday's Porch Door!");
}}
aria-label="Open Tuesday's Porch Door to claim 50 XP and reveal today's doorstep parcel"
className={${tapSize} rounded-xl ${ porchDoorOpen ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : btnPrimary }}
>
{porchDoorOpen ? '🚪 Door Open ✓' : '🚪 Open Door (+50 XP)'}

{['Mon', 'Tue', 'Wed⚡', 'Thu', 'Fri', 'Sat', 'Sun🎁'].map((day, i) => {
const isOpen = i === 0 || (i === 1 && porchDoorOpen);
return (
<div
key={day}
aria-label={${day}: ${isOpen ? 'Door Open' : 'Closed'}}
className={py-1.5 rounded-xl border text-[10px] font-extrabold ${ isOpen ? highContrast ? 'bg-yellow-400 text-black border-white' : 'bg-emerald-500/25 border-emerald-400 text-emerald-300' : highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400' }}
>
{day}
{isOpen ? '🚪' : '🔒'}

);
})}
{porchDoorOpen && !parcelOpened && (
<button
onClick={() => {
setParcelOpened(true);
awardXp(75, 'Opened Surprise Doorstep Parcel!');
}}
className={w-full rounded-xl py-2 text-xs font-extrabold border ${ highContrast ? 'border-yellow-400 text-yellow-300' : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' }}
>
📦 Surprise Doorstep Parcel Inside! Tap to Open (+75 XP)

)}
{/* 3. FOUR COMPACT BENTO UTILITY TILES (INCLUDING LIVE TRAFFIC REPORT) */}

<div className={${cardCls} p-3}>

Weather


6°C
Bright after frost
<button
onClick={() => setActiveModal('traffic')}
aria-label="Open Live Local Traffic, Roadworks and Transit Report"
className={${cardCls} p-3 text-left}
>

🚦 Traffic & Transit


{cityData.trafficSummary}
Live road report →
<button
onClick={() => setActiveModal('bins')}
aria-label="Set your exact street bin collection day"
className={${cardCls} p-3 text-left}
>

🗑️ Street Bins


{streetBinDay}
{streetBinColour}
<button
onClick={() => setActiveModal('pharmacy')}
aria-label="Find open late-night NHS pharmacies"
className={${cardCls} p-3 text-left}
>

💊 Late Pharmacy


Open Until 10 PM
NHS chemists →

{/* 4. SINGLE CLEAN LOCAL PARTNER PERK CARD */}
<div className={${cardCls} p-3.5 space-y-2}>
<span className={text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-500/20 text-emerald-300'}}>
{activeOffer.tier === 1 ? ${activePostcode} Local Perk : UK Saver Perk • Partner}


{activeOffer.business_name}
<p className={${textScale} text-slate-200 mt-0.5}>{activeOffer.offer_headline}

{activeOffer.tier === 1 ? (
<button
onClick={() => setActiveModal('voucher')}
aria-label={Claim free pass from ${activeOffer.business_name} with code ${activeOffer.promo_code}}
className={w-full ${tapSize} rounded-xl ${btnPrimary} flex items-center justify-center gap-2}
>
 Claim Free Pass ({activeOffer.promo_code})

) : (
<a
href={activeOffer.affiliate_url || 'awin1.com'}
target="_blank"
rel="noopener noreferrer"
aria-label={Compare Car Insurance in ${activePostcode} on partner site, opens external link}
className={w-full ${tapSize} rounded-xl ${btnPrimary} flex items-center justify-center gap-2}
>
Check Savings in {activePostcode} (Partner) ↗

)}

)}
{/* ================= TAB 2: FUEL ================= */}
{(singlePageMode || activeTab === 'fuel') && (
<div className={${cardCls} p-4 space-y-3}>


 Beat the Pump ({activePostcode})

UK Avg: 165.3p
{!fuelRevealed ? (


<button
aria-label="Decrease fuel price guess by 0.5p"
onClick={() => setFuelGuess((g) => Math.max(145, +(g - 0.5).toFixed(1)))}
className={${tapSize} rounded-xl border border-slate-600 font-extrabold}
>
-0.5p


{fuelGuess.toFixed(1)}p

<button
aria-label="Increase fuel price guess by 0.5p"
onClick={() => setFuelGuess((g) => Math.min(185, +(g + 0.5).toFixed(1)))}
className={${tapSize} rounded-xl border border-slate-600 font-extrabold}
>
+0.5p


<button
onClick={() => {
setFuelRevealed(true);
awardXp(Math.abs(fuelGuess - cityData.fuelPrice) <= 1.5 ? 50 : 15, 'Beat the Pump!');
}}
className={w-full ${tapSize} rounded-xl ${btnPrimary}}
>
Lock Guess & Reveal Cheapest Pump


) : (


Cheapest: {cityData.fuelPrice}p/L at {cityData.fuelStation}


Saves £{(((165.3 - cityData.fuelPrice) * 50) / 100).toFixed(2)} on a 50L tank vs UK avg!

<button
onClick={() => {
navigator.clipboard?.writeText(
⛽ Petrol is ${cityData.fuelPrice}p/L at ${cityData.fuelStation}! Found on SocialPorch.
);
announce('Copied fuel deal to share on WhatsApp!');
}}
className={w-full ${tapSize} rounded-xl border border-emerald-500/50 text-emerald-300 font-bold flex items-center justify-center gap-2}
>
 Share Fuel Deal to WhatsApp


)}

)}
{/* ================= TAB 3: FOCUSED 2-GAME ARCADE & LEADERBOARD ================= */}
{(singlePageMode || activeTab === 'arcade') && (
<div className={${cardCls} p-3.5 space-y-3}>

{(['block', 'wordle'] as const).map((g) => (
<button
key={g}
onClick={() => setArcadeGame(g)}
className={flex-1 ${tapSize} rounded-xl font-extrabold border ${ arcadeGame === g ? btnPrimary : highContrast ? 'border-yellow-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300' }}
>
{g === 'block' ? '🧱 Block Blast' : '🔤 Postcode Wordle'}

))}
{arcadeGame === 'block' ? (


Score: {blockScore} pts

Next Piece: {BLOCK_SHAPES[selectedPieceIdx].name}



{grid.map((row, ri) =>
row.map((cell, ci) => (
<button
key={${ri}-${ci}}
aria-label={Row ${ri + 1} Column ${ci + 1}: ${cell ? 'Filled' : 'Empty'}}
onClick={() => handlePlaceBlock(ri, ci)}
className={aspect-square rounded-md border font-bold text-xs ${ cell === 1 ? highContrast ? 'bg-yellow-400 border-white text-black' : 'bg-emerald-500 border-emerald-300 text-slate-950' : highContrast ? 'bg-black border-yellow-400' : 'bg-slate-800 border-slate-700 hover:border-emerald-400' }}
>
{cell === 1 ? '■' : ''}

))
)}


Tap any empty square to place your {BLOCK_SHAPES[selectedPieceIdx].name}. Clear a full row or column for +25 XP!


) : (

Guess today's 5-letter UK/local word (Hint: Molineux pack):
<form
onSubmit={(e) => {
e.preventDefault();
const clean = wordGuess.trim().toUpperCase();
if (clean.length !== 5) return;
setWordGuesses((prev) => [...prev, clean]);
setWordGuess('');
if (clean === 'WOLVE') awardXp(50, 'Solved Postcode Wordle!');
}}
className="flex gap-2"
>
<input
maxLength={5}
aria-label="Enter 5-letter word guess"
value={wordGuess}
onChange={(e) => setWordGuess(e.target.value.toUpperCase())}
placeholder="5 letters..."
className={flex-1 rounded-xl px-3 py-2 text-sm font-mono font-bold uppercase ${highContrast ? 'bg-black border-2 border-yellow-400 text-white' : 'bg-slate-800 border border-slate-700'}}
/>
<button type="submit" className={${btnPrimary} rounded-xl px-4 text-xs}>
Guess



{wordGuesses.map((g, gi) => (

{g.split('').map((ch, ci) => {
const target = 'WOLVE';
const status =
target[ci] === ch ? '✓' : target.includes(ch) ? '~' : '✕';
return (
<div
key={ci}
aria-label={${ch}: ${status === '✓' ? 'Exact' : status === '~' ? 'Wrong spot' : 'Not in word'}}
className={py-1.5 rounded border ${ status === '✓' ? 'bg-emerald-500 text-black border-white' : status === '~' ? 'bg-amber-400 text-black border-white' : 'bg-slate-800 text-slate-300 border-slate-700' }}
>
{ch} {status}

);
})}

))}


)}
<div className={${cardCls} p-3.5 space-y-2}>

 UK Postcode Leaderboard


{leaderboard.map((row, idx) => (
<div
key={row.code}
className={flex items-center justify-between text-xs px-3 py-1.5 rounded-xl border ${ row.code === activePostcode ? highContrast ? 'bg-yellow-400 text-black border-white font-extrabold' : 'bg-emerald-500/20 border-emerald-400 font-bold' : 'border-slate-800 bg-slate-800/40' }}
>
#{idx + 1} {row.city} ({row.code})
{row.xp.toLocaleString()} XP

))}


)}
{/* ================= TAB 4: SPORT ================= */}
{(singlePageMode || activeTab === 'sport') && (
<div className={${cardCls} p-3.5 space-y-1.5}>
⚽ {cityData.club}
<p className={${textScale} font-semibold}>{cityData.clubStat}
<div className={${cardCls} p-3.5 flex items-center justify-between}>

Helpful Neighbour Spotter
Flag a road closure or queue in {activePostcode}

<button
onClick={() => awardXp(25, Shared live travel spot in ${activePostcode})}
className={${tapSize} rounded-xl ${btnPrimary}}
>
+ Spot (+25 XP)


)}
{/* QUIET FOOTER WITH UK GDPR PRIVACY LINK */}

SocialPorch • Your postcode's daily brief, games & perks • 100% Free Forever

<button onClick={() => setActiveModal('sponsor')} className="underline hover:text-emerald-300">
Advertise your local business (£19/mo)

•
<button onClick={() => setActiveModal('install')} className="underline hover:text-emerald-300">
Install to Home Screen

•
<button onClick={() => setActiveModal('privacy')} className="underline hover:text-emerald-300">
Privacy & UK GDPR



{/* ================= ACCESSIBLE MODALS ================= */}
{activeModal && (

<div className={${cardCls} max-w-md w-full p-5 space-y-3 relative max-h-[85vh] overflow-y-auto}>
<button
aria-label="Close modal"
onClick={() => setActiveModal(null)}
className={absolute top-3 right-3 ${tapSize} rounded-xl border border-slate-600}
>

{activeModal === 'voucher' && (


{activeOffer.business_name}
{activeOffer.offer_headline}

{activeOffer.promo_code}

LIVE DIGITAL PASS • {liveClock}

)}
{activeModal === 'traffic' && (

🚦 Live Local Traffic & Transit ({activePostcode})

{[...cityData.trafficAlerts, ...neighborTrafficReports].map((alert, i) => (
{alert}
))}
<form
onSubmit={(e) => {
e.preventDefault();
if (!trafficNoteInput.trim()) return;
setNeighborTrafficReports((prev) => [
Neighbour Report (${activePostcode}): ${trafficNoteInput.trim()},
...prev,
]);
setTrafficNoteInput('');
awardXp(15, 'Added live local traffic report!');
}}
className="flex gap-1.5 pt-1"
>
<input
aria-label="Report local traffic or roadworks"
value={trafficNoteInput}
onChange={(e) => setTrafficNoteInput(e.target.value)}
placeholder="Flag a jam or roadwork (+15 XP)..."
className="flex-1 rounded-xl px-3 py-2 bg-slate-800 border border-slate-700 text-xs"
/>
<button type="submit" className={${btnPrimary} rounded-xl px-3 text-xs}>
Report

<a
href="nationalrail.co.uk"
target="_blank"
rel="noopener noreferrer"
aria-label={Open National Rail Live Departures for ${cityData.railStation}, external link}
className={block text-center ${tapSize} rounded-xl ${btnPrimary}}
>
🚆 {cityData.railStation} Live Departures ↗

<a
href="theaa.com"
target="_blank"
rel="noopener noreferrer"
aria-label="Open live UK road traffic map, external link"
className={block text-center ${tapSize} rounded-xl border border-slate-600 font-bold}
>
🗺️ Live UK Road Traffic Map ↗



)}
{activeModal === 'bins' && (

🗑️ Street Bin Day Setup

UK councils schedule bins by individual house address (not postcode). Save your street's day below:

<select
aria-label="Select your street bin collection day"
value={streetBinDay}
onChange={(e) => setStreetBinDay(e.target.value)}
className="w-full rounded-xl p-2.5 bg-slate-800 border border-slate-700 text-xs font-bold"
>
{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((d) => (
{d}
))}

<select
aria-label="Select your bin colour"
value={streetBinColour}
onChange={(e) => setStreetBinColour(e.target.value)}
className="w-full rounded-xl p-2.5 bg-slate-800 border border-slate-700 text-xs font-bold"
>
Blue Recycling + Food
Black General Waste + Food
Garden Waste

<a
href="www.gov.uk"
target="_blank"
rel="noopener noreferrer"
aria-label={Look up your house on ${cityData.council} website, opens external link}
className={block text-center ${tapSize} rounded-xl ${btnPrimary}}
>
Check House on {cityData.council} ↗


)}
{activeModal === 'pharmacy' && (

💊 Late-Night NHS Pharmacies ({activePostcode})

{activePostcode.startsWith('WV')
? 'Murrays Healthcare Penn Rd (WV3) & Boots Bentley Bridge (WV11) open until 10:00 PM.'
: `Check live late-night chemist hours near ${activePostcode
}.} </p> <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer" aria-label="Find an open pharmacy on NHS.uk, opens external link" className={block text-center ${tapSize} rounded-xl ${btnPrimary}`}
>
Find Open Chemist on NHS.uk ↗


)}
{activeModal === 'alerts' && (

🔔 Save Streak & Free Alerts
{!alertSaved ? (
<form
onSubmit={(e) => {
e.preventDefault();
setAlertSaved(true);
awardXp(100, 'Saved Account & Enabled Alerts!');
}}
className="space-y-2.5"
>

Save your {userXp} XP and get 7:00 PM night-before {streetBinDay} bin reminders:

<input
type="email"
required
placeholder="Your email (1-tap magic link)"
value={alertEmail}
onChange={(e) => setAlertEmail(e.target.value)}
className="w-full rounded-xl p-2.5 bg-slate-800 border border-slate-700 text-xs"
/>
<button type="submit" className={w-full ${tapSize} rounded-xl ${btnPrimary}}>
Save & Get +100 XP Bonus


) : (

✓ Synced to {alertEmail}! Your streak and {streetBinDay} bin reminders are active.

)}

)}
{activeModal === 'sponsor' && (
<form
onSubmit={(e) => {
e.preventDefault();
setActiveOffer({
postcode_prefix: activePostcode,
tier: 1,
business_name: sponsorForm.name,
offer_headline: sponsorForm.headline,
promo_code: sponsorForm.code.toUpperCase(),
});
setActiveModal(null);
announce(Published ${sponsorForm.name} live in ${activePostcode}!);
}}
className="space-y-2.5 pt-2"
>
Feature Your Business in {activePostcode} (£19/mo)
<input
required
placeholder="Business Name"
value={sponsorForm.name}
onChange={(e) => setSponsorForm({ ...sponsorForm, name: e.target.value })}
className="w-full rounded-xl p-2.5 bg-slate-800 border border-slate-700 text-xs"
/>
<input
required
placeholder="Offer (e.g. Free Pastry with Morning Coffee)"
value={sponsorForm.headline}
onChange={(e) => setSponsorForm({ ...sponsorForm, headline: e.target.value })}
className="w-full rounded-xl p-2.5 bg-slate-800 border border-slate-700 text-xs"
/>
<input
required
placeholder="Promo Code (e.g. WV4FREE)"
value={sponsorForm.code}
onChange={(e) => setSponsorForm({ ...sponsorForm, code: e.target.value })}
className="w-full rounded-xl p-2.5 bg-slate-800 border border-slate-700 text-xs uppercase"
/>
<button type="submit" className={w-full ${tapSize} rounded-xl ${btnPrimary}}>
Preview & Publish in {activePostcode}


)}
{activeModal === 'install' && (



Install SocialPorch (100% Free)

iPhone (Safari): Tap the Share icon at the bottom → Add to Home Screen.
Android (Chrome): Tap the ⋮ menu → Install App or Add to Home Screen.

)}
{activeModal === 'privacy' && (

🔒 Privacy & UK GDPR
GPS location is completely OFF by default and only used if you voluntarily tap "Near Me" to find your postcode.
We never sell your email or data, and you can unsubscribe or delete your streak account in 1 tap anytime.

)}


)}

);
}

---

### Your Quick File Checklist on GitHub (8 Files Total)
When you create your **`socialporch`** repository on GitHub, make sure these 8 files are inside:
1. `package.json` *(from earlier in chat)*
2. `tailwind.config.ts` *(from earlier in chat)*
3. `postcss.config.mjs` *(from earlier in chat)*
4. `app/globals.css` *(from earlier in chat)*
5. `app/layout.tsx` *(from earlier in chat)*
6. `public/manifest.json` *(from earlier in chat)*
7. `public/icon.svg` *(pasted above)*
8. `app/page.tsx` *(pasted above)*
