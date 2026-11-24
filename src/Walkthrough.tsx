import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {scenes} from './scenes';

const FPS = 30;
const INTRO = 4 * FPS;
const OUTRO = 5 * FPS;
const FADE = 15; // crossfade overlap between scenes, in frames
const ACCENT = '#22d3ee';
const BG = '#05080a';
const FONT = 'Inter, "Segoe UI", system-ui, sans-serif';

const sceneFrames = scenes.map((s) => Math.round(s.seconds * FPS));
const starts = sceneFrames.reduce<number[]>((acc, len, i) => [...acc, i === 0 ? INTRO - FADE : acc[i - 1] + sceneFrames[i - 1] - FADE], []);
const outroStart = starts.length ? starts[starts.length - 1] + sceneFrames[sceneFrames.length - 1] - FADE : INTRO;
export const totalFrames = outroStart + OUTRO;

const fadeInOut = (frame: number, len: number) =>
  interpolate(frame, [0, FADE, len - FADE, len], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Glow = () => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 60%, rgba(16,120,90,0.35), ${BG} 65%)`}} />
);

const Intro = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 200}});
  return (
    <AbsoluteFill style={{opacity: fadeInOut(frame, INTRO), fontFamily: FONT, alignItems: 'center', justifyContent: 'center'}}>
      <Glow />
      <div style={{textAlign: 'center', transform: `translateY(${(1 - pop) * 40}px)`, opacity: pop}}>
        <div style={{color: ACCENT, letterSpacing: 12, fontSize: 28, fontWeight: 600}}>ASCEND PROTOCOL</div>
        <div style={{color: 'white', fontSize: 120, fontWeight: 800, marginTop: 20}}>The AI-run life OS.</div>
        <div style={{color: '#9fb3b8', fontSize: 36, marginTop: 24}}>A full walkthrough</div>
      </div>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - 5, fps, config: {damping: 200}});
  const opacity = interpolate(frame, [0, FADE], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity, fontFamily: FONT, alignItems: 'center', justifyContent: 'center'}}>
      <Glow />
      <div style={{textAlign: 'center', opacity: pop, transform: `scale(${0.9 + pop * 0.1})`}}>
        <div style={{color: 'white', fontSize: 110, fontWeight: 800}}>Ascend</div>
        <div style={{color: '#9fb3b8', fontSize: 38, marginTop: 20}}>Habits, goals, and an AI assistant in one place.</div>
      </div>
    </AbsoluteFill>
  );
};

const Scene = ({index}: {index: number}) => {
  const s = scenes[index];
  const len = sceneFrames[index];
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = interpolate(frame, [0, len], [0, 1], {easing: Easing.inOut(Easing.ease)});
  const [fx, fy] = s.focus ?? [50, 50];
  const scale = interpolate(t, [0, 1], [1.0, s.zoom ?? 1.12]);
  const card = spring({frame: frame - 10, fps, config: {damping: 200}});
  return (
    <AbsoluteFill style={{opacity: fadeInOut(frame, len), backgroundColor: BG, fontFamily: FONT}}>
      <AbsoluteFill style={{padding: 70, paddingBottom: 200}}>
        <div style={{flex: 1, borderRadius: 24, overflow: 'hidden', boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.25)`}}>
          <div style={{position: 'relative', width: '100%', height: '100%', transformOrigin: `${fx}% ${fy}%`, transform: `scale(${scale})`}}>
            <Img src={staticFile(`shots/${s.file}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        </div>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 70, right: 70, bottom: 50, display: 'flex', alignItems: 'center', gap: 32, opacity: card, transform: `translateY(${(1 - card) * 30}px)`}}>
        <div style={{color: ACCENT, fontSize: 30, fontWeight: 700, minWidth: 80}}>{String(index + 1).padStart(2, '0')}</div>
        <div>
          <div style={{color: 'white', fontSize: 44, fontWeight: 700}}>{s.title}</div>
          <div style={{color: '#9fb3b8', fontSize: 28, marginTop: 6}}>{s.caption}</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 6, width: `${((index + t) / scenes.length) * 100}%`, background: ACCENT}} />
    </AbsoluteFill>
  );
};

export const Walkthrough = () => (
  <AbsoluteFill style={{backgroundColor: BG}}>
    <Sequence durationInFrames={INTRO}><Intro /></Sequence>
    {scenes.map((_, i) => (
      <Sequence key={i} from={starts[i]} durationInFrames={sceneFrames[i]}><Scene index={i} /></Sequence>
    ))}
    <Sequence from={outroStart} durationInFrames={OUTRO}><Outro /></Sequence>
  </AbsoluteFill>
);
