// src/components/sections/LinkSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';


export default function LinkSection() {
  // ★ アイコン・URL・QRパス・ボタンテキストを配列で管理
  const links = [
    {
      icon: 'img/icons/x_icon.png',
      url: 'https://github.com/your-username',
      qr: 'img/icons/x_qr.png',
      alt: 'X',
      buttonText: 'X',
      buttonIcon: 'img/icons/link_icon.png',
    },
    {
      icon: 'img/icons/instagram_icon.png',
      url: 'https://twitter.com/your-username',
      qr: 'img/icons/instagram_qr.png',
      alt: 'Instagram',
      buttonText: 'Instagram',
      buttonIcon: 'img/icons/link_icon.png',
    },
    {
      icon: 'img/icons/line_stamp.png',
      url: 'https://www.linkedin.com/in/your-username',
      qr: 'img/icons/stamp_qr.png',
      alt: 'LINEスタンプ',
      buttonText: 'LINEスタンプ',
      buttonIcon: 'img/icons/link_icon.png',
    },
  ];

  // 各項目ごとに「ひっくり返っているか」「アクセスボタン表示中か」を state で持つ
  const [states, setStates] = useState(
    links.map(() => ({ flipped: false, showButton: false }))
  );

  // アイコン（front）クリック時：ひっくり返して「アクセス」ボタン表示
  const handleIconClick = (idx) => {
    setStates((prev) =>
      prev.map((s, i) =>
        i === idx ? { flipped: true, showButton: true } : s
      )
    );
  };

  // QRコード（back）クリック時：元に戻してボタンも非表示に
  const handleQrClick = (idx) => {
    setStates((prev) =>
      prev.map((s, i) =>
        i === idx ? { flipped: false, showButton: false } : s
      )
    );
  };

  // アクセスボタンクリック時：指定 URL を別タブで開く
  const handleAccessClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ホバー時の「少し跳ねてゆっくり戻る」モーション
  const hoverAnim = {
    y: -10,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  };

  return (
    <div className="link-section-wrapper">
      {links.map((item, idx) => {
        const { flipped, showButton } = states[idx];

        return (
          <div key={idx} className="link-item">
            {/* カード全体を Motion.div で包み、rotateY でひっくり返る */}
            <motion.div
              className="card-container"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              whileHover={hoverAnim}
            >
              {/* front フェイス：アイコン画像 */}
              <div
                className="card-face card-front"
                onClick={() => handleIconClick(idx)}
              >
                <img src={item.icon} alt={item.alt} />
              </div>
              {/* back フェイス：QRコード */}
              <div
                className="card-face card-back"
                onClick={() => handleQrClick(idx)}
              >
                <img src={item.qr} alt={`${item.alt} QR`} />
              </div>
            </motion.div>

            {/* アクセスボタン：showButton が true のときだけ表示 */}
            {showButton && (
             <button
               className="access-button"
               onClick={() => handleAccessClick(item.url)}
             >
               <span className="button-text">{item.buttonText}</span>
               <img
                 className="button-icon"
                 src={item.buttonIcon}
                 alt="外部リンク"
               />
             </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
