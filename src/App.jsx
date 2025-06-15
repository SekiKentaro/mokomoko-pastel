import React, { useState, useRef, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Header from './components/Header';
import Section from './components/Section';
import sectionsConfig from './config/sectionsConfig';
import Scene from './components/Scene';
import { scrollToSection } from './utils/scroll';


// 各セクションの設定（dummy テキストは改行 "\n" で可変）
const sections = [
  { id: 'first',   camera: 'camera1', title: 'ファーストビュー', dummy: 'ここはファーストビュー用のテキストです。' },
  { id: 'story',   camera: 'camera2', title: 'ストーリー',     dummy: 'ここはストーリー用の説明文を入れます。\n改行も可能です。' },
  { id: 'profile', camera: 'camera3', title: 'プロフィール',   dummy: 'プロフィールのダミー情報です。' },
  { id: 'content', camera: 'camera4', title: 'コンテンツ',     dummy: '' },
  { id: 'link',    camera: 'camera5', title: 'リンク',         dummy: 'こちらはリンクセクションのテキストです。' }
];

export default function App() {
  const [idx, setIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelRotY, setModelRotY] = useState(0);
  const dragging = useRef({ active: false, startX: 0, startRot: 0 });
  const scrolling = useRef(false);

  // マウスホイールで idx を変更
  const onWheel = useCallback(e => {
    if (scrolling.current) return;
    if (e.deltaY > 50 && idx < sections.length - 1) {
      scrolling.current = true;
      setIdx(i => i + 1);
    } else if (e.deltaY < -50 && idx > 0) {
      scrolling.current = true;
      setIdx(i => i - 1);
    }
  }, [idx]);

  // ドラッグ操作でモデルを回転
  const onPointerDown = useCallback(e => {
    if (idx !== 0) return;
    const ev = e.clientX !== undefined ? e : e.event;
    dragging.current = { active: true, startX: ev.clientX, startRot: modelRotY };
    ev.target.setPointerCapture?.(ev.pointerId);
  }, [idx, modelRotY]);

  const onPointerMove = useCallback(e => {
    if (!dragging.current.active) return;
    const ev = e.clientX !== undefined ? e : e.event;
    const delta = ev.clientX - dragging.current.startX;
    setModelRotY(dragging.current.startRot + delta * 0.005);
  }, []);

  const endDrag = useCallback(e => {
    dragging.current.active = false;
    const ev = e?.clientX !== undefined ? e : e?.event;
    ev?.target.releasePointerCapture?.(ev.pointerId);
  }, []);

  // idx が変わったらスクロール＆カメラを移動
  useEffect(() => {
    scrollToSection(sections[idx].id);
    if (idx !== 0) setModelRotY(0);
    const t = setTimeout(() => scrolling.current = false, 1000);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <>
      {/* ヘッダーに onSelect を渡す */}
      <Header
        onSelect={id => setIdx(sectionsConfig.findIndex(s => s.id === id))}
        isFirst={idx === 0}
        setMenuOpen={setMenuOpen}
      />

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          // ← here we explicitly set the same lens you had before:
          camera={{ fov: 38.6, near: 0.1, far: 1000 }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight intensity={0.5} position={[25, 40,50]} />
          <Suspense fallback={null}>
            <Scene
              activeCamera={sectionsConfig[idx].camera}
              modelRotY={modelRotY}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* モデル読み込みプログレスバー */}
      <Loader
        containerStyles={{ backgroundColor: '#000', height: '5px' }}
        innerStyles={{ backgroundColor: '#fff' }}
        dataStyles={{ color: '#fff', fontSize: '0.8rem' }}
        dataInterpolation={p => `${p.toFixed(0)}%`}
      />

      {/* 各セクション */}
      <div className={`sections-container${menuOpen ? ' disabled' : ''}`}
           onWheel={onWheel}
      >
        {sectionsConfig.map(({ id, title, component: C, motion, styles }) => (
          <Section
            key={id}
            id={id}
            title={title}
            motion={motion}
            styles={styles}
          >
            {C}
          </Section>
        ))}
      </div>

      {/* TOPに戻るボタン */}
        <img
          src="img/return.png"
          alt="return"
          className="return-button"
          onClick={() => setIdx(0)}
        />
    </>
  );
}
