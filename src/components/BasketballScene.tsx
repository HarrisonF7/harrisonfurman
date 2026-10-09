import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Ball({ rotating, active, compact }: { rotating: boolean; active: boolean; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [dragging, setDragging] = useState(false);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#d87127'; ctx.fillRect(0, 0, 512, 512);
    // Seeded pebbles keep the texture repeatable, with no network assets.
    let seed = 137; const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let y = 0; y < 512; y += 5) for (let x = 0; x < 512; x += 5) { ctx.beginPath(); ctx.arc(x + random() * 2, y + random() * 2, 1.2 + random() * .6, 0, Math.PI * 2); ctx.fillStyle = random() > .5 ? '#a94c18' : '#f29a48'; ctx.fill(); }
    const map = new THREE.CanvasTexture(canvas); map.wrapS = map.wrapT = THREE.RepeatWrapping; map.repeat.set(3, 2); return map;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  const seams = useMemo(() => {
    const radius = 1.507;
    const circle = (plane: number) => Array.from({ length: 181 }, (_, i) => { const t = i / 180 * Math.PI * 2; return plane === 0 ? new THREE.Vector3(radius * Math.cos(t), radius * Math.sin(t), 0) : new THREE.Vector3(0, radius * Math.cos(t), radius * Math.sin(t)); });
    const curved = (side: number) => Array.from({ length: 181 }, (_, i) => { const t = i / 180 * Math.PI * 2; const x = side * .64 * Math.cos(t * 2); const ring = Math.sqrt(1 - x * x); return new THREE.Vector3(radius * x, radius * ring * Math.cos(t), radius * ring * Math.sin(t)); });
    return [circle(0), circle(1), curved(-1), curved(1)].map(points => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), compact ? 100 : 180, .018, 6, true));
  }, [compact]);
  useEffect(() => () => seams.forEach(geometry => geometry.dispose()), [seams]);
  useFrame((_, delta) => { if (group.current && rotating && active && !dragging) group.current.rotation.y += Math.min(delta, .05) * .15; });
  return <><group ref={group} rotation={[.24, .1, -.34]}><mesh><sphereGeometry args={[1.5, compact ? 48 : 80, compact ? 32 : 64]}/><meshStandardMaterial color="#f58426" map={texture} bumpMap={texture} bumpScale={.027} roughness={.84}/></mesh>{seams.map((geometry, i) => <mesh key={i} geometry={geometry}><meshStandardMaterial color="#211c18" roughness={1}/></mesh>)}</group><OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={.07} rotateSpeed={.65} onStart={() => setDragging(true)} onEnd={() => setDragging(false)} /></>;
}
export default function BasketballScene({ rotating }: { rotating: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [compact, setCompact] = useState(window.innerWidth < 700);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrapper.current) observer.observe(wrapper.current);
    const visibility = () => setTabVisible(!document.hidden); const resize = () => setCompact(window.innerWidth < 700);
    document.addEventListener('visibilitychange', visibility); window.addEventListener('resize', resize);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('resize', resize); };
  }, []);
  const active = visible && tabVisible;
  return <div ref={wrapper} className="scene" role="img" aria-label="Interactive 3D basketball. Drag with your mouse or horizontally with one finger to rotate."><Canvas dpr={[1, compact ? 1.25 : 1.75]} frameloop={active ? rotating ? 'always' : 'demand' : 'never'} camera={{ position: [0, 0, 5.2], fov: 43 }} gl={{ alpha: true, antialias: !compact }} onCreated={({ gl }) => { gl.domElement.style.touchAction = 'pan-y'; }}><ambientLight intensity={1.4}/><directionalLight position={[-3, 5, 5]} intensity={3.4} color="#fff2db"/><directionalLight position={[3, -1, -2]} intensity={1.5} color="#91caff"/><Ball rotating={rotating} active={active} compact={compact}/></Canvas></div>;
}
