import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_CONFIG } from '@/constants';

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const ORBIT_INNER = [
  { label: 'React',      color: '#61dafb', symbol: '⚛' },
  { label: 'TypeScript', color: '#3178c6', symbol: 'TS' },
  { label: 'Laravel',    color: '#ff2d20', symbol: '🔺' },
  { label: 'Node.js',    color: '#68a063', symbol: '⬡' },
  { label: 'Docker',     color: '#2496ed', symbol: '🐳' },
  { label: 'MySQL',      color: '#e48e00', symbol: '🗄' },
];
const ORBIT_OUTER = [
  { label: 'JavaScript', color: '#f7df1e', symbol: 'JS' },
  { label: 'PHP',        color: '#8892be', symbol: '🐘' },
  { label: 'Git',        color: '#f05032', symbol: '⑂' },
  { label: 'Vite',       color: '#a259ff', symbol: '⚡' },
  { label: 'Tailwind',   color: '#38bdf8', symbol: '🌊' },
  { label: 'MongoDB',    color: '#4db33d', symbol: '🍃' },
  { label: 'Python',     color: '#4584b6', symbol: '🐍' },
  { label: 'Linux',      color: '#ffcc02', symbol: '🐧' },
];

const MATRIX_CHARS = 'TS</>{}[]const=>async await function return import export class interface type enum void null';
const CODE_EDGE = [
  "npm run build","git push origin main","php artisan serve",
  "docker compose up -d","SELECT * FROM users","yarn add framer-motion",
  "useEffect(()=>{},[])", "interface Props {}","composer install",
];
const COMETS = Array.from({ length: 8 }, (_, i) => ({
  id: i, delay: i * 1.8, dur: 2.5 + i * 0.4,
  startX: Math.random() * 60 + 20, startY: Math.random() * 40,
  angle: 30 + Math.random() * 20,
}));
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2 + 0.3, dur: Math.random() * 5 + 2, delay: Math.random() * 5,
  color: ['#fff','#a78bfa','#06b6d4','#fff','#fff'][i % 5],
}));

/* ═══════════════════════════════════════════════════════
   TYPEWRITER HOOK
═══════════════════════════════════════════════════════ */
function useTypewriter(text: string, speed = 60, startDelay = 600) {
  const [d, setD] = useState('');
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => { setD(text.slice(0, ++i)); if (i >= text.length) clearInterval(iv); }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return d;
}

/* ═══════════════════════════════════════════════════════
   MATRIX RAIN (canvas)
═══════════════════════════════════════════════════════ */
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);
    const chars = MATRIX_CHARS.split('');
    const draw = () => {
      ctx.fillStyle = 'rgba(4,1,14,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '12px Courier New';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() * 0.15;
        ctx.fillStyle = `rgba(124,58,237,${alpha})`;
        ctx.fillText(ch, i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const iv = setInterval(draw, 60);
    return () => clearInterval(iv);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />;
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const LoadingScreen = () => {
  const name = useTypewriter(APP_CONFIG.NAME.toUpperCase(), 55, 800);
  const role = useTypewriter('FULLSTACK DEVELOPER', 45, 1800);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setPercent(p => Math.min(p + Math.random() * 6, 98)), 140);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position:'fixed', inset:0, background:'#04010e', zIndex:9999, overflow:'hidden', fontFamily:"'Courier New',monospace" }}>

      {/* Matrix rain */}
      <MatrixRain />

      {/* Stars */}
      {STARS.map(s => (
        <motion.div key={s.id}
          animate={{ opacity:[0.1,0.9,0.1], scale:[1,1.5,1] }}
          transition={{ duration:s.dur, repeat:Infinity, delay:s.delay }}
          style={{ position:'absolute', left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size, borderRadius:'50%', background:s.color, pointerEvents:'none' }} />
      ))}

      {/* Shooting comets */}
      {COMETS.map(c => (
        <motion.div key={c.id}
          initial={{ x:`${c.startX}vw`, y:`${c.startY}vh`, opacity:0 }}
          animate={{ x:`${c.startX + 40}vw`, y:`${c.startY + 30}vh`, opacity:[0, 1, 1, 0] }}
          transition={{ duration:c.dur, delay:c.delay, repeat:Infinity, repeatDelay:8, ease:'linear' }}
          style={{ position:'absolute', top:0, left:0, pointerEvents:'none',
            width:80, height:1.5, borderRadius:999,
            background:`linear-gradient(90deg,transparent,#a78bfa,#06b6d4)`,
            boxShadow:`0 0 8px #7c3aed`,
            transformOrigin:'left center',
            transform:`rotate(${c.angle}deg)`,
          }} />
      ))}

      {/* Hex grid overlay */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:0.3,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16Z' fill='none' stroke='%237c3aed' stroke-width='0.3' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize:'56px 100px',
      }} />

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center,transparent 30%,#04010e 90%)', pointerEvents:'none', zIndex:1 }} />

      {/* Ambient blobs */}
      {[{top:'35%',left:'50%',color:'#7c3aed',s:700},{top:'65%',left:'60%',color:'#06b6d4',s:400}].map((b,i) => (
        <motion.div key={i}
          animate={{ opacity:[0.12,0.22,0.12], scale:[1,1.12,1] }}
          transition={{ duration:6+i*2, repeat:Infinity, delay:i*1.5 }}
          style={{ position:'absolute', top:b.top, left:b.left, transform:'translate(-50%,-50%)', width:b.s, height:b.s, borderRadius:'50%', background:`radial-gradient(circle,${b.color} 0%,transparent 70%)`, filter:'blur(80px)', pointerEvents:'none' }} />
      ))}

      {/* Scanning line */}
      <motion.div
        initial={{top:'-2%'}} animate={{top:'102%'}}
        transition={{duration:4, repeat:Infinity, ease:'linear', repeatDelay:0.5}}
        style={{position:'absolute',left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,#7c3aed,#ffffff44,#06b6d4,transparent)',boxShadow:'0 0 20px #7c3aed,0 0 60px #7c3aed44',pointerEvents:'none',zIndex:5}} />

      {/* Edge code snippets */}
      {CODE_EDGE.map((code, i) => (
        <motion.div key={i}
          initial={{opacity:0}}
          animate={{opacity:[0, 0.22, 0.1, 0.22, 0], x:[0,-6,0]}}
          transition={{duration:7+i%4, repeat:Infinity, delay:i*0.7}}
          style={{
            position:'absolute',
            ...(i<3 ? {top:`${8+i*10}%`,left:'1.5%'} : i<6 ? {top:`${8+(i-3)*10}%`,right:'1.5%'} : {bottom:`${5+(i-6)*12}%`,left:`${10+(i-6)*20}%`}),
            fontSize:'0.55rem', color:['#7c3aed','#06b6d4','#a78bfa'][i%3], pointerEvents:'none', whiteSpace:'nowrap', zIndex:2,
          }}>
          {code}
        </motion.div>
      ))}

      {/* ══ 3D SOLAR SYSTEM ══ */}
      <div style={{position:'absolute',top:'44%',left:'50%',transform:'translate(-50%,-50%)',zIndex:10,perspective:800}}>

        {/* Tilted orbital plane wrapper */}
        <div style={{transform:'rotateX(52deg) rotateZ(-15deg)',transformStyle:'preserve-3d',position:'relative',width:560,height:560,display:'flex',alignItems:'center',justifyContent:'center'}}>

          {/* Orbit track rings */}
          {[190, 280].map((r,i) => (
            <div key={i} style={{
              position:'absolute', borderRadius:'50%',
              width:r*2, height:r*2, top:'50%', left:'50%', marginTop:-r, marginLeft:-r,
              border:`1px solid rgba(124,58,237,${i===0?0.2:0.1})`,
              boxShadow:`0 0 20px rgba(124,58,237,${i===0?0.1:0.05}) inset`,
            }} />
          ))}

          {/* INNER orbit */}
          <motion.div animate={{rotate:360}} transition={{duration:20,ease:'linear',repeat:Infinity}}
            style={{position:'absolute',width:380,height:380,top:'50%',left:'50%',marginTop:-190,marginLeft:-190}}>
            {ORBIT_INNER.map((item,i) => {
              const a = (i/ORBIT_INNER.length)*2*Math.PI;
              return (
                <motion.div key={item.label}
                  animate={{rotate:-360}}
                  transition={{duration:20,ease:'linear',repeat:Infinity}}
                  style={{position:'absolute',top:`calc(50% + ${Math.sin(a)*190}px)`,left:`calc(50% + ${Math.cos(a)*190}px)`,transform:'translate(-50%,-50%)'}}>
                  <motion.div
                    initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}
                    transition={{delay:0.3+i*0.1}}
                    whileHover={{scale:1.2}}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'5px 10px',borderRadius:8,border:`1px solid ${item.color}66`,background:'rgba(4,1,14,0.9)',backdropFilter:'blur(10px)',whiteSpace:'nowrap',boxShadow:`0 0 12px ${item.color}44`}}>
                    <span style={{fontSize:'0.85rem'}}>{item.symbol}</span>
                    <span style={{fontSize:'0.62rem',color:item.color,fontWeight:700,letterSpacing:0.5,fontFamily:'sans-serif'}}>{item.label}</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* OUTER orbit */}
          <motion.div animate={{rotate:-360}} transition={{duration:34,ease:'linear',repeat:Infinity}}
            style={{position:'absolute',width:560,height:560,top:'50%',left:'50%',marginTop:-280,marginLeft:-280}}>
            {ORBIT_OUTER.map((item,i) => {
              const a = (i/ORBIT_OUTER.length)*2*Math.PI;
              return (
                <motion.div key={item.label}
                  animate={{rotate:360}}
                  transition={{duration:34,ease:'linear',repeat:Infinity}}
                  style={{position:'absolute',top:`calc(50% + ${Math.sin(a)*280}px)`,left:`calc(50% + ${Math.cos(a)*280}px)`,transform:'translate(-50%,-50%)'}}>
                  <motion.div
                    initial={{opacity:0,scale:0}} animate={{opacity:0.85,scale:1}}
                    transition={{delay:0.5+i*0.08}}
                    style={{display:'flex',alignItems:'center',gap:4,padding:'4px 8px',borderRadius:7,border:`1px solid ${item.color}44`,background:'rgba(4,1,14,0.85)',backdropFilter:'blur(8px)',whiteSpace:'nowrap',boxShadow:`0 0 8px ${item.color}33`}}>
                    <span style={{fontSize:'0.78rem'}}>{item.symbol}</span>
                    <span style={{fontSize:'0.58rem',color:item.color,fontWeight:700,letterSpacing:0.5,fontFamily:'sans-serif'}}>{item.label}</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CORE */}
          <div style={{position:'relative',zIndex:20,transform:'rotateX(-52deg) rotateZ(15deg)'}}>
            <motion.div
              initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
              transition={{duration:0.8,ease:[0.175,0.885,0.32,1.275]}}
              style={{position:'relative',width:130,height:130,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {/* SVG rings */}
              {[{r:58,dur:3.5,dir:1,stroke:'rgba(124,58,237,1)',dash:'40 330'},{r:47,dur:6,dir:-1,stroke:'rgba(6,182,212,0.8)',dash:'22 280'},{r:36,dur:10,dir:1,stroke:'rgba(167,139,250,0.6)',dash:'10 220'}].map((ring,i) => (
                <motion.svg key={i} width={130} height={130} viewBox="0 0 130 130" style={{position:'absolute'}}
                  animate={{rotate:ring.dir*360}} transition={{duration:ring.dur,ease:'linear',repeat:Infinity}}>
                  <circle cx={65} cy={65} r={ring.r} fill="none" stroke={ring.stroke} strokeWidth={1.5} strokeDasharray={ring.dash} strokeLinecap="round"
                    style={{filter:`drop-shadow(0 0 6px ${ring.stroke})`}} />
                </motion.svg>
              ))}
              {/* Ball */}
              <motion.div
                animate={{boxShadow:['0 0 30px rgba(124,58,237,0.8),0 0 60px rgba(124,58,237,0.4)','0 0 60px rgba(124,58,237,1),0 0 120px rgba(6,182,212,0.6),0 0 200px rgba(124,58,237,0.3)','0 0 30px rgba(124,58,237,0.8),0 0 60px rgba(124,58,237,0.4)']}}
                transition={{duration:2.5,repeat:Infinity}}
                style={{position:'relative',width:62,height:62,borderRadius:'50%',background:'linear-gradient(135deg,#7c3aed 0%,#06b6d4 100%)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{position:'absolute',top:6,left:9,width:18,height:9,borderRadius:'50%',background:'rgba(255,255,255,0.35)',filter:'blur(3px)'}} />
                <motion.span animate={{opacity:[0.8,1,0.8]}} transition={{duration:2,repeat:Infinity}}
                  style={{fontSize:'1.2rem',fontWeight:900,color:'white'}}>
                  {APP_CONFIG.NAME.split(' ').map(n=>n[0]).join('')}
                </motion.span>
              </motion.div>
              {/* Corner brackets */}
              {[{top:-10,left:-10,rot:0},{top:-10,right:-10,rot:90},{bottom:-10,right:-10,rot:180},{bottom:-10,left:-10,rot:270}].map((p,i)=>(
                <motion.svg key={i} width={16} height={16} viewBox="0 0 20 20"
                  initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{delay:0.6+i*0.1}}
                  style={{position:'absolute',...p,transform:`rotate(${p.rot}deg)`}}>
                  <polyline points="0,14 0,0 14,0" fill="none" stroke="#7c3aed" strokeWidth={2.5}/>
                </motion.svg>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Text + progress */}
      <div style={{position:'absolute',top:'69%',left:'50%',transform:'translateX(-50%)',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        {/* Name */}
        <div style={{fontSize:'1.9rem',fontWeight:900,letterSpacing:8,background:'linear-gradient(90deg,#a78bfa,#7c3aed,#06b6d4,#a78bfa)',backgroundSize:'300% 100%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shimmer 3s linear infinite',textAlign:'center',minHeight:'2.4rem'}}>
          {name}
          <AnimatePresence>
            {name.length < APP_CONFIG.NAME.length && (
              <motion.span animate={{opacity:[1,0]}} transition={{duration:0.5,repeat:Infinity}} style={{color:'#7c3aed',WebkitTextFillColor:'#7c3aed'}}>|</motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}
          style={{fontSize:'0.7rem',letterSpacing:6,color:'rgba(6,182,212,0.6)',marginTop:6,textAlign:'center',minHeight:'1rem'}}>
          {role}
          <AnimatePresence>
            {role.length < 'FULLSTACK DEVELOPER'.length && (
              <motion.span animate={{opacity:[1,0]}} transition={{duration:0.5,repeat:Infinity}} style={{color:'#06b6d4'}}>|</motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
          style={{marginTop:28,width:300,display:'flex',flexDirection:'column',gap:6}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.6rem',letterSpacing:3,color:'rgba(167,139,250,0.4)'}}>
            <span>INITIALIZING</span><span>{Math.round(percent)}%</span>
          </div>
          <div style={{height:1,background:'rgba(124,58,237,0.12)',borderRadius:999,overflow:'hidden',position:'relative'}}>
            <motion.div animate={{width:`${percent}%`}} transition={{ease:'easeOut'}}
              style={{height:'100%',background:'linear-gradient(90deg,#7c3aed,#a78bfa,#06b6d4)',borderRadius:999,boxShadow:'0 0 10px #7c3aed'}} />
          </div>
          <div style={{display:'flex',gap:3,justifyContent:'center',marginTop:6}}>
            {Array.from({length:16}).map((_,i)=>(
              <motion.div key={i}
                animate={{opacity:percent>i*6.5?1:0.08,scale:percent>i*6.5?1:0.5}}
                style={{width:3.5,height:3.5,borderRadius:0.5,background:i%3===0?'#7c3aed':i%3===1?'#a78bfa':'#06b6d4',boxShadow:percent>i*6.5?`0 0 5px ${i%2===0?'#7c3aed':'#06b6d4'}`:'none'}} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes shimmer{0%{background-position:0% 50%}100%{background-position:300% 50%}}`}</style>
    </div>
  );
};

export default LoadingScreen;
