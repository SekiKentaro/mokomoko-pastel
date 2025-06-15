// src/components/sections/ContentSection.jsx
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

Modal.setAppElement('#root');

// ダミーのサムネイル＆動画URL 配列
const thumbnails = [
  // { thumbnail: '/thumbs/thumb1.jpg', videoUrl: '/movie/video1.mp4' },
  // { thumbnail: '/thumbs/thumb2.jpg', videoUrl: '/movie/video2.mp4' },
  // { thumbnail: '/thumbs/thumb3.jpg', videoUrl: '/movie/video3.mp4' },
  // { thumbnail: '/thumbs/thumb4.jpg', videoUrl: '/movie/video4.mp4' },
  // { thumbnail: '/thumbs/thumb5.jpg', videoUrl: '/movie/video5.mp4' },
  // { thumbnail: '/thumbs/thumb6.jpg', videoUrl: '/movie/video6.mp4' },
  // { thumbnail: '/thumbs/thumb7.jpg', videoUrl: '/movie/video7.mp4' },
  // { thumbnail: '/thumbs/thumb8.jpg', videoUrl: '/movie/video8.mp4' },
  // { thumbnail: '/thumbs/thumb9.jpg', videoUrl: '/movie/video9.mp4' },
];

export default function ContentSection() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const videoRef = useRef(null);

  function openModal(src) {
    setCurrentSrc(src);
    setIsOpen(true);
  }

  function closeModal() {
    // 動画が再生中なら停止する
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsOpen(false);
    setCurrentSrc('');
  }

  // グリッド全体の variants（ステアリング）
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  // 各カードの “横回転” バリアント
  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateY: 90,
      transformOrigin: 'center',
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      transformOrigin: 'center',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // モーダルオーバーレイのフェード variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  // モーダルコンテンツのフェード＋スケール variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <div className="content-section-wrapper">
        <motion.div
          className="video-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {thumbnails.map((item, index) => (
            <motion.div
              key={index}
              className="video-thumb"
              onClick={() => openModal(item.videoUrl)}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}      // ← ホバーで少し拡大
            >
              <img
                src={item.thumbnail}
                alt={`thumb-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            className="video-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}  // ← オーバーレイ領域クリックで閉じる
          >
            <motion.div
              className="video-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}  // ← モーダル内クリックは伝播させない
            >
              <button className="modal-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
              <video
                ref={videoRef}
                src={currentSrc}
                controls
                className="modal-video"
                // autoPlay を外して自動再生しないように
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
