import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Heart, Music2, Pause, LockKeyhole, Sparkles, X, ChevronLeft, ChevronRight, Smile, CloudRain, Flame, MessageCircleHeart, RotateCcw, VolumeX, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pages, countdown, validPin, shuffleBoard, moveTile, isSolved, solvedBoard, hintMove } from '@/lib/birthday';
import { letter } from '@/lib/letter';
import envelope from '@/assets/love-envelope.png';
import cake from '@/assets/birthday-cake.jpg';
import cakePhoto from '@/assets/birthday-cake-suhani.png.asset.json';
import suhani1 from '@/assets/suhani-1.png.asset.json';
import suhani2 from '@/assets/suhani-2.png.asset.json';
import suhani3 from '@/assets/suhani-3.png.asset.json';
import suhani4 from '@/assets/suhani-4.png.asset.json';
import suhani5 from '@/assets/suhani-5.png.asset.json';
import suhani6 from '@/assets/suhani-6.webp.asset.json';
import suhani7 from '@/assets/suhani-7.webp.asset.json';

const portraitPhotos = [
  '/images/suhani-1.png',
  '/images/suhani-2.png',
  '/images/suhani-3.png',
  '/images/suhani-4.png',
  '/images/suhani-5.png',
  '/images/suhani-6.png',
  '/images/suhani-7.png'
];
import couple1 from '@/assets/couple-ghibli-1.webp.asset.json';
import couple2 from '@/assets/couple-ghibli-2.webp.asset.json';
import couple3 from '@/assets/couple-ghibli-3.webp.asset.json';
import couple4 from '@/assets/couple-ghibli-4.webp.asset.json';
import couple5 from '@/assets/couple-ghibli-5.webp.asset.json';
import couple6 from '@/assets/couple-ghibli-6.webp.asset.json';
import couple7 from '@/assets/couple-ghibli-7.webp.asset.json';
import couple8 from '@/assets/couple-ghibli-8.webp.asset.json';
import couple9 from '@/assets/couple-ghibli-9.webp.asset.json';
import couple10 from '@/assets/couple-ghibli-10.webp.asset.json';
import couple11 from '@/assets/couple-ghibli-11.png.asset.json';
import usCake from '@/assets/us-birthday-cake.png.asset.json';
const couplePhotos = [
  '/images/couple-ghibli-1.png',
  '/images/couple-ghibli-2.png',
  '/images/couple-ghibli-3.png',
  '/images/couple-ghibli-4.png',
  '/images/couple-ghibli-5.png',
  '/images/couple-ghibli-6.png',
  '/images/couple-ghibli-7.png',
  '/images/couple-ghibli-8.png',
  '/images/couple-ghibli-9.png',
  '/images/couple-ghibli-10.png',
  '/images/couple-ghibli-11.png'
];


import { GiftBox } from './GiftBox';

function Confetti() {
  return <div className="confetti" aria-hidden="true">{Array.from({ length: 42 }, (_, i) => <span key={i} className="confetti-piece" style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * .12}s` }} />)}</div>;
}
function Photo({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // A photo that already failed (cached 404) errors before React attaches its listener,
  // so also inspect the element after mount to keep the honest empty frame.
  useEffect(() => { const node = img.current; if (node?.complete && node.naturalWidth === 0) setMissing(true); }, [src]);
  return <div className="photo-slot">{missing ? <div className="photo-placeholder"><Heart /><span>{label}</span><span>A little space for your photo</span></div> : <img ref={img} src={src} alt={label} loading="lazy" onError={() => setMissing(true)} />}</div>;
}
function Music() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  async function toggle() {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); setPlaying(false); }
    else { try { await audio.current.play(); setPlaying(true); } catch { setUnavailable(true); setPlaying(false); } }
  }
  return <><audio ref={audio} src="/audio/our-song.mp3" preload="none" loop /><Button variant="ghost" size="icon" className="music-control" onClick={toggle} title={unavailable ? 'Our song hasn’t been added yet' : playing ? 'Pause our song' : 'Play our song'} aria-label={unavailable ? 'Our song hasn’t been added yet' : playing ? 'Pause our song' : 'Play our song'}>{unavailable ? <VolumeX /> : playing ? <Pause /> : <Music2 />}</Button></>;
}
function Continue({ step, children = 'A little more magic' }: { step: number; children?: ReactNode }) {
  const next = pages[step + 1];
  if (!next) return null;
  return <div className="continue-row"><Button asChild className="romantic-button"><Link to={next.path}>{children}<ArrowRight /></Link></Button></div>;
}
function Welcome() {
  const [escape, setEscape] = useState(0);
  const positions = [{ x: 0, y: 0 }, { x: 18, y: 56 }, { x: -120, y: 62 }, { x: -20, y: -46 }];
  const pos = positions[escape % positions.length] ?? { x: 0, y: 0 };
  const runaway = () => setEscape(value => value + 1);
  return <><img src={envelope} width={1024} height={1024} className="welcome-art" alt="An open envelope with a soft pink heart" /><div className="eyebrow">A little surprise for my favorite person</div><h1 className="page-title">Hey, <em>Suhani!</em></h1><p className="page-subtitle">Today isn’t just another day.<br />It’s the day the world got a little more beautiful.</p><div className="script-note mt-3">And it’s all because of you ♡</div><p className="welcome-question">Ready for a little birthday magic?</p><div className="welcome-actions"><Button asChild className="romantic-button"><Link to="/secret-pin">Yes, I’m ready <Heart size={15} /></Link></Button><motion.div animate={pos}><Button variant="outline" className="romantic-button run-away" onPointerEnter={event => { if (event.pointerType === 'mouse') runaway(); }} onPointerDown={event => { event.preventDefault(); runaway(); }} onClick={runaway}>No, not yet</Button></motion.div></div><p className="quiet-note"><LockKeyhole />{escape ? 'Nice try… this surprise has your name on it ♡' : 'Just you, me, and a few little surprises.'}</p></>;
}
function Pin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState(0);
  return <><div className="large-symbol"><LockKeyhole className="mx-auto h-16 w-16 text-primary" strokeWidth={1} /></div><h1 className="page-title">A little secret,<br /><em>just for us.</em></h1><p className="page-subtitle">Three little numbers. One big feeling.<br />Hint: I · love · you ♡</p><motion.form key={errors} animate={errors ? { x: [0, -9, 9, -9, 0] } : {}} className="pin-area" onSubmit={event => { event.preventDefault(); if (validPin(pin)) navigate({ to: '/magical-gift' }); else { setErrors(value => value + 1); setPin(''); } }}><input aria-label="Secret PIN" className="pin-input" type="password" inputMode="numeric" pattern="[0-9]*" maxLength={3} autoComplete="off" value={pin} onChange={event => setPin(event.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="♡ ♡ ♡" /><Button type="submit" className="romantic-button mt-5 w-full">Unlock my heart <ArrowRight /></Button>{errors > 0 && <p role="alert" className="error-note">Not quite, sweetheart. Try our three little words again ♡</p>}</motion.form></>;
}
function MagicalGift() {
  const [open, setOpen] = useState(false);
  return <>{open && <Confetti />}<h1 className="page-title">A little box.<br /><em>A whole lot of love.</em></h1><p className="page-subtitle">Some things are too special to wrap in words.</p><motion.div animate={open ? { scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] } : { rotate: [-3, 3, -3] }} transition={open ? { duration: .6 } : { duration: 3, repeat: Infinity }}><Button variant="ghost" className="gift-control" aria-label="Open your birthday gift" onClick={() => setOpen(true)}><GiftBox open={open} /></Button></motion.div>{open ? <><p className="script-note">Surprise! A whole little world, made just for you ♡</p><Continue step={2}>Let’s celebrate you</Continue></> : <p className="script-note">This one has your name on it, Suhani ♡</p>}</>;
}
function Birthday() {
  const [remaining, setRemaining] = useState<number[]>([]);
  useEffect(() => { const update = () => setRemaining(countdown(Date.now())); update(); const id = setInterval(update, 1000); return () => clearInterval(id); }, []);
  return <><Confetti /><div className="birthday-balloons" aria-hidden="true"><span /><span /></div><div className="eyebrow">October 14, 2026 · your beautiful new chapter</div><h1 className="page-title">Happy 24th,<br /><em>Suhani Jain!</em></h1><div className="script-note">24 looks beautiful on you ♡</div><img src="/images/birthday-cake-suhani.png" className="cake-art" alt="Suhani cutting a chocolate birthday cake with Happy Birthday and a red heart written on top" width={1214} height={1295} /><p className="page-subtitle">May your wishes be big, your worries small,<br />and this year your sweetest one yet. 🎈</p><div className="countdown" aria-label="Countdown to October 14, 2027">{['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => <div className="countdown-item" key={label}><strong>{remaining[index] === undefined ? '—' : String(remaining[index]).padStart(2, '0')}</strong><span>{label}</span></div>)}</div><p className="quiet-note">Until we celebrate you again · October 14, 2027</p><Continue step={3}>But first, a little more love</Continue></>;
}
const portraitCaptions = ['That smile ♡', 'Simply, beautifully you', 'My favorite kind of sunshine', 'A little bit of magic', 'You, in all your loveliness', 'The sweetest soul', 'My favorite person'];
function Gallery({ couple = false }: { couple?: boolean }) {
  const count = couple ? 11 : 7;
  const [selected, setSelected] = useState<number | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const close = () => { const previous = selected; setSelected(null); if (previous !== null) refs.current[previous]?.focus(); };
  const source = (index: number) => couple ? couplePhotos[index] ?? `/images/couple-ghibli-${index + 1}.jpg` : portraitPhotos[index] ?? `/images/suhani-${index + 1}.jpg`;
  const caption = (index: number) => couple ? `Our little world · ${String(index + 1).padStart(2, '0')}` : portraitCaptions[index] ?? 'Beautiful you';
  useEffect(() => {
    if (selected === null) return;
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); if (event.key === 'ArrowRight') setSelected(value => value === null ? null : (value + 1) % count); if (event.key === 'ArrowLeft') setSelected(value => value === null ? null : (value + count - 1) % count); };
    window.addEventListener('keydown', onKey); return () => { document.body.style.overflow = old; window.removeEventListener('keydown', onKey); };
  }, [selected, count]);
  return <><h1 className="page-title">{couple ? <>You, me &<br /><em>a little magic.</em></> : <>My favorite kind<br />of <em>beautiful.</em></>}</h1><p className="page-subtitle">{couple ? 'Eleven little windows into our story. ♡' : 'Seven little reminders of how lovely you are. ♡'}</p><div className="content-area gallery-grid">{Array.from({ length: count }, (_, index) => <Button key={index} ref={node => { refs.current[index] = node; }} variant="ghost" className="polaroid" onClick={() => setSelected(index)} aria-label={`Open photo ${index + 1}`}><Photo src={source(index)} label={caption(index)} /><span className="photo-caption">{caption(index)}</span></Button>)}</div><Continue step={couple ? 7 : 4}>{couple ? 'There’s so much to love about you' : 'For all your little moods'}</Continue><AnimatePresence>{selected !== null && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop" onClick={close}><div role="dialog" aria-modal="true" aria-label="Photo gallery" className="lightbox" onClick={event => event.stopPropagation()}><Button autoFocus variant="ghost" size="icon" className="dialog-close" aria-label="Close photo" onClick={close}><X /></Button><Photo key={selected} src={source(selected)} label={caption(selected)} /><div className="lightbox-controls"><Button variant="secondary" size="icon" aria-label="Previous photo" onClick={() => setSelected((selected + count - 1) % count)}><ChevronLeft /></Button><span>{selected + 1} / {count}</span><Button variant="secondary" size="icon" aria-label="Next photo" onClick={() => setSelected((selected + 1) % count)}><ChevronRight /></Button></div></div></motion.div>}</AnimatePresence></>;
}
const moods = [
  { title: 'When You Miss Me', icon: Heart, text: 'Suhani, take a slow breath and imagine the biggest hug. Distance can keep us in different places, but it cannot make you any less important to me. I’m thinking of you, and I’m looking forward to being beside you again. ♡' },
  { title: "When You’re Sad", icon: CloudRain, text: 'My sweet Suhani, you don’t have to turn a difficult day into a smile for anyone. You can tell me what hurts, or we can simply be quiet together. You are loved on your heavy days too. One breath at a time, sweetheart. ♡' },
  { title: "When You’re Angry", icon: Flame, text: 'Your feelings matter, Suhani. Take your time; I want to listen, not rush you. We can pause, find the words, and work through things with kindness. You and I are on the same side. ♡' },
  { title: "When You’re Happy", icon: Smile, text: 'There’s my sunshine! Whatever made you happy today, I want to celebrate it with you. Let that smile stay a little longer. Your joy deserves room, and I’m so glad I get to cheer for you. ♡' },
  { title: 'When You Want Attention', icon: MessageCircleHeart, text: 'Excuse me, Miss Suhani Jain, you have my full attention. One imaginary forehead kiss, one very long hug, and a reminder: you are my favorite person to make a little extra fuss over. Coffee or tea today? Your choice. ♡' },
];
function Moods() {
  const [chosen, setChosen] = useState<number | null>(null);
  const message = chosen === null ? null : moods[chosen];
  useEffect(() => { if (chosen === null) return; const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') setChosen(null); }; window.addEventListener('keydown', listener); return () => window.removeEventListener('keydown', listener); }, [chosen]);
  return <><h1 className="page-title">Whatever the mood,<br /><em>always your person.</em></h1><p className="page-subtitle">A few words from my heart, for whatever yours is feeling.</p><div className="content-area mood-grid">{moods.map((mood, i) => <Button key={mood.title} variant="ghost" className="mood-card" onClick={() => setChosen(i)}><mood.icon /><span>{mood.title}</span><span className="font-script text-xl text-primary">For you ♡</span></Button>)}</div><Continue step={5}>Something from my heart</Continue>{message && <div className="modal-backdrop" onClick={() => setChosen(null)}><div role="dialog" aria-modal="true" aria-labelledby="mood-title" className="message-dialog" onClick={event => event.stopPropagation()}><Button autoFocus size="icon" variant="ghost" className="dialog-close" aria-label="Close message" onClick={() => setChosen(null)}><X /></Button><message.icon className="mx-auto mb-5 h-9 w-9 text-primary" strokeWidth={1} /><h2 id="mood-title" className="font-display text-3xl mb-5">{message.title}</h2><p className="page-subtitle">{message.text}</p><div className="script-note mt-5">Always here for you ♡</div></div></div>}</>;
}
function Letter() { return <><h1 className="page-title">My Letter to You ❤️</h1><p className="page-subtitle">Some feelings deserve a little more than a few words.</p><article className="content-area letter-paper">{letter.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article><Continue step={6}>Continue Our Story</Continue></>; }
const reasons = [
  ['Your smile', '♡', 'Your smile is lovely, and knowing you have a reason to smile makes my world a little brighter.'],
  ['Your heart', '❥', 'The person you are on the inside is what makes you truly beautiful to me.'],
  ['Your personality', '✧', 'I love getting to know your thoughts, your opinions, and every little thing that makes you uniquely Suhani.'],
  ['Your cuteness', '☺', 'You have a kind of sweetness that doesn’t need trying. Just being you is more than enough.'],
  ['Your presence', '☼', 'Being beside you is something I look forward to. You matter to me more than perfect words can say.'],
  ['Our memories', '✿', 'From our meeting on Sunday, October 10, to the pages still unwritten, I’m grateful for our story.'],
  ['Simply being you', '∞', 'No checklist. No conditions. You don’t have to become someone else to be special to me.'],
];
function Reasons() {
  const [flipped, setFlipped] = useState<number[]>([]);
  return <><h1 className="page-title">Seven reasons.<br /><em>One very special you.</em></h1><p className="page-subtitle">And honestly? These are only the beginning.</p><div className="content-area reasons-grid">{reasons.map(([title, symbol, text], i) => <Button key={title} variant="ghost" className={`flip-card ${flipped.includes(i) ? 'flipped' : ''}`} aria-label={`${title}: reveal reason`} aria-pressed={flipped.includes(i)} onClick={() => setFlipped(values => values.includes(i) ? values.filter(value => value !== i) : [...values, i])}><span className="flip-inner"><span className="flip-face" aria-hidden={flipped.includes(i)}><span>{symbol}</span><strong>{title}</strong></span><span className="flip-face flip-back" aria-hidden={!flipped.includes(i)}>{text}</span></span></Button>)}</div><Continue step={8}>One last little surprise</Continue></>;
}
function Puzzle() {
  const [board, setBoard] = useState<number[]>([1,2,3,4,5,6,7,0,8]);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [peek, setPeek] = useState(false);
  const [hint, setHint] = useState<number | null>(null);
  const solved = isSolved(board);
  useEffect(() => { setBoard(shuffleBoard()); }, []);
  useEffect(() => { if (!started || solved) return; const id = setInterval(() => setElapsed(value => value + 1), 1000); return () => clearInterval(id); }, [started, solved]);
  function play(index: number) {
    if (solved) return;
    const next = moveTile(board, index); if (next === board) return;
    setStarted(true); setBoard(next); setMoves(value => value + 1); setHint(null);
    if (isSolved(next)) sessionStorage.setItem('suhani-puzzle-solved', 'true');
  }
  function restart() { setBoard(shuffleBoard()); setMoves(0); setElapsed(0); setStarted(false); setHint(null); }
  function showHint() { setHint(hintMove(board)); }
  function skip() { sessionStorage.setItem('suhani-puzzle-solved', 'true'); setBoard([...solvedBoard]); }
  return <>{solved && <Confetti />}<h1 className="page-title">A little puzzle.<br /><em>A sweet surprise.</em></h1><p className="page-subtitle">One last piece of birthday magic, just for you.</p><div className="content-area puzzle-wrap"><div className="puzzle-stats"><span>{moves} moves</span><span>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}</span></div><div className="puzzle-board" aria-label="Birthday cake sliding puzzle">{peek && <img src={cake} alt="The finished picture — a little hint" className="puzzle-peek" />}{board.map((value, index) => value === 0 ? <div key="empty" className="puzzle-empty" aria-label="Empty space" /> : <Button key={value} variant="ghost" className={`puzzle-tile ${hint === index ? 'puzzle-hint' : ''}`} aria-label={`Move tile ${value}`} onClick={() => play(index)} style={{ backgroundImage: `url(${cake})`, backgroundPosition: `${((value - 1) % 3) * 50}% ${Math.floor((value - 1) / 3) * 50}%` }}><span className="puzzle-number">{value}</span></Button>)}</div><div className="mt-4 flex flex-wrap items-center justify-center gap-2"><Button variant="ghost" onClick={restart}><RotateCcw />Start again</Button><Button variant="ghost" onClick={() => setPeek(value => !value)} aria-pressed={peek}>{peek ? <EyeOff /> : <Eye />}{peek ? 'Hide the picture' : 'Peek at the picture'}</Button><Button variant="ghost" onClick={showHint}><Sparkles />Show me the next move</Button></div><p className="quiet-note mt-3">Little tip: the numbers show where each piece belongs — 1, 2, 3 on top, and the empty corner rests at the bottom right.</p><Button variant="ghost" className="mt-2 text-sm opacity-80" onClick={skip}><Wand2 />Too tricky? Skip to the surprise</Button></div>{solved ? <><p role="status" className="script-note mt-5">You did it, sweetheart! The surprise is yours ♡</p><Continue step={9}>Open your final surprise</Continue></> : <p className="quiet-note"><LockKeyhole />A little something is waiting on the other side.</p>}</>;
}
function Finale() {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => { setUnlocked(sessionStorage.getItem('suhani-puzzle-solved') === 'true'); }, []);
  if (!unlocked) return <><div className="large-symbol"><LockKeyhole className="mx-auto h-16 w-16 text-primary" /></div><h1 className="page-title">One little piece<br /><em>is still waiting.</em></h1><p className="page-subtitle">Your final surprise will be here after the birthday puzzle.</p><Button asChild className="romantic-button mt-6"><Link to="/birthday-puzzle">Back to your puzzle <ArrowRight /></Link></Button></>;
  return <><Confetti /><div className="eyebrow">The best part of the story</div><h1 className="page-title">My favorite place<br />is <em>beside you.</em></h1><div className="final-frame"><Photo src="/images/us-birthday-cake.png" label="Us, cutting your birthday cake ♡" /><div className="photo-caption">A little cake. A whole lot of us. ♡</div></div><div className="script-note">Happy 24th birthday, my Suhani.</div><p className="page-subtitle mt-4">Here’s to you, to your wishes, and to all the beautiful pages we haven’t written yet. You are loved, today and always.</p><p className="font-display text-2xl mt-6 text-primary">All my love. Always yours. ♡</p><Button asChild variant="outline" className="romantic-button mt-6"><Link to="/">Our story, from the beginning <RotateCcw /></Link></Button></>;
}
export function Journey({ step }: { step: number }) {
  const previous = pages[step - 1];
  const contents = [<Welcome />, <Pin />, <MagicalGift />, <Birthday />, <Gallery />, <Moods />, <Letter />, <Gallery couple />, <Reasons />, <Puzzle />, <Finale />];
  return <div className="birthday-shell"><header className="site-header"><Link to="/" className="brand"><Heart strokeWidth={1.4} />For Suhani<span className="text-primary">.</span></Link><div className="header-right"><span className="date-tag">14 October · 24 wishes</span><Music /></div></header><div aria-hidden="true">{Array.from({ length:6 }, (_, i) => <Heart key={i} fill="currentColor" strokeWidth={0} className={`ambient-heart hearts-${i}`} />)}</div><motion.main initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }} className={`journey ${step === 0 ? 'welcome-journey' : ''}`}>{previous && <Button asChild variant="ghost" size="icon" className="back-link"><Link to={previous.path} aria-label="Previous chapter"><ArrowLeft /></Link></Button>}<div className="chapter-label"><Sparkles size={12} />{step === 0 ? 'Made with love. Just for you.' : pages[step]?.label}</div>{contents[step]}<div className="journey-bottom"><div className="progress-dots" aria-label={`Chapter ${step + 1} of 11`}>{pages.map((page, i) => <span key={page.path} className={`progress-dot ${i === step ? 'active' : ''}`} />)}</div><div className="chapter-count">{String(step + 1).padStart(2, '0')} / 11 · {step === 0 ? 'Our little birthday story' : 'A little closer to the surprise'}</div></div></motion.main><footer className="footer-note">A little corner of the internet, made with <span>♡</span> for Suhani.</footer></div>;
}
