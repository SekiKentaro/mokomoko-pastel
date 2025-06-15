// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes  } from 'react-icons/fa';  // FaTimes はオーバーレイ内の閉じるボタンで使っています
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../utils/scroll';


const links = [
//   { id: 'first',   label: 'ファーストビュー' },
  { id: 'story',   label: 'ストーリー' },
  { id: 'profile', label: 'プロフィール' },
  { id: 'content', label: 'コンテンツ' },
  { id: 'link',    label: 'リンク' },
];

export default function Header({ onSelect, isFirst, setMenuOpen }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);

  // body スクロール抑制 & 親通知
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    setMenuOpen?.(open);
    return () => document.body.style.overflow = '';
  }, [open, setMenuOpen]);

  const handleNavClick = id => {
    setOpen(false);
    onSelect(id);
    scrollToSection(id);
  };

  const variants = {
    hidden:  { y: -80, opacity: 0 },
    visible: { y:   0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      <motion.header
        key={isFirst ? 'full' : 'minimal'}
        className={`header ${isFirst ? 'full' : 'minimal'}`}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.4 }}
      >
        {/* 左：ロゴ */}
          <img
            src="img/logo.png"
            alt="logo"
            className={`logo ${isFirst ? 'logo-large' : ''}`}
            onClick={() => handleNavClick('first')}
          />

        {/* デスクトップのフルナビ（ファーストビュー時のみ） */}
        {isFirst && (
          <nav className="nav desktop-only">
            {links.map(l => (
              <span
                key={l.id}
                className="nav-link"
                onClick={() => handleNavClick(l.id)}
              >
                {l.label}
              </span>
            ))}
          </nav>
        )}

        {/* ハンバーガーアイコン（ファーストビューでは非表示、メニューを開いたときも非表示） */}
        {!isFirst && !open && (
          <div className="hamburger" onClick={toggle}>
            <FaBars />
          </div>
        )}

        {/* オーバーレイメニュー */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* オーバーレイ内の閉じるボタン */}
              <button
                className="overlay-close"
                onClick={toggle}
              >
                <FaTimes size={24} />
              </button>

              {/* 中央に縦並び */}
              {links.map(l => (
                <span
                  key={l.id}
                  className="overlay-link"
                  onClick={() => handleNavClick(l.id)}
                >
                  {l.label}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
);
}
