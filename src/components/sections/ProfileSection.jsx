import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ① パネル情報を配列で管理 (タイトル, 内容, カラーコード)
const panels = [
  {
    title: 'スキル',
    content: 'プログラミング、デザイン、プロジェクト管理などを行います。',
    color: '#EBADAD',
  },
  {
    title: '経歴',
    content: '2020年〜現在: Webエンジニアとして多様なプロジェクトに参加。',
    color: '#EBEBAD',
  },
  {
    title: '趣味',
    content: '写真撮影、旅行、読書を楽しんでいます。',
    color: '#ADEBAD',
  },
  {
    title: '好きな言語',
    content: 'JavaScript, Python, Rust など。',
    color: '#ADEBEB',
  },
  {
    title: '目標',
    content: 'フルスタックエンジニアとして活躍し、社会に貢献すること。',
    color: '#ADADEB',
  },
  {
    title: '連絡先',
    content: 'メール: example@example.com\nTwitter: @example',
    color: '#EBADEB',
  },
];

export default function ProfileSection() {
  // ② 現在開いているパネルのインデックス (null はどれも開いていない状態)
  const [openIndex, setOpenIndex] = useState(null);

  // クリック時の処理
  const handleClick = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="profile-container">
      {panels.map((panel, idx) => {
        // ③ 6方向に円形配置するための角度・座標計算
        const angleDeg = idx * 60; // 0°, 60°, 120°, … 300°
        const theta = ((angleDeg - 90) * Math.PI) / 180; 
        const radiusPct = 30; // 円の半径を「コンテナ幅の30%」
        const xPct = 50 + radiusPct * Math.cos(theta);
        const yPct = 50 + radiusPct * Math.sin(theta);

        const isOpen = openIndex === idx;

        // ④ クリック時は「中央へ移動 + 拡大」、閉じたら「元の位置 + 元のサイズ」に戻す
        return (
          <motion.div
            key={idx}
            className="circle-panel"
            onClick={() => handleClick(idx)}
            style={{
              position: 'absolute',
              backgroundColor: panel.color,
              opacity: 0.8, // 半透明
              cursor: 'pointer',
            }}
            animate={{
              // 左右位置 (%文字列とし、パーセンテージをアニメート)
              left: isOpen ? '50%' : `${xPct}%`,
              top:  isOpen ? '50%' : `${yPct}%`,
              x: isOpen ? '-50%' : '-50%',
              y: isOpen ? '-50%' : '-50%',
              // 拡大／縮小
              width:  isOpen ? 400 : 200,
              height: isOpen ? 400 : 200,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            {/* ⑤ transformOrigin = center にしておく */}
            <motion.div
              className="panel-title"
              animate={{
                fontSize: isOpen ? 18 : 14,
              }}
              transition={{ duration: 0.3 }}
            >
              {panel.title}
            </motion.div>

            {/* 開いているパネルには内容を表示 */}
            {isOpen && (
              <motion.div
                className="panel-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {panel.content.split('\n').map((line, i) =>
                  line === '' ? <br key={i} /> : <p key={i}>{line}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
