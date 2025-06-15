// src/components/sections/StorySection.jsx
import React from 'react';
import { motion } from 'framer-motion';

// 見出し・本文それぞれで使う文字単位のアニメーション variants
const charVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.4,
    },
  },
};

// コンテナ（文字群）を遅延させるための variants
const lineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // 0.03秒ずつ文字を遅延
    },
  },
};

export default function StorySection() {
  const headingText = "ストーリー";
  const bodyText =
    "ここにストーリーの内容を入力します。これはダミーテキストです。\n" +
    "物語ははるか昔、静かな村で始まりました。村人たちは毎朝\n" +
    "陽光のもとで作物を育て、家族とともに穏やかな日々を送りました。\n" +
    "しかしある日、空が暗く覆われ、遠くの山から恐ろしい影が現れて…\n\n" +
    "このダミーテキストは物語のサンプルとして表示しています。\n" +
    "必要に応じて内容を差し替えてください。";

  // テキストを文字単位に分割。改行は '\n' として扱う
  const splitToChars = (text) => text.split("");

  return (
    <div className="story-content-container">
      {/* 見出し文字群をラップする motion.div */}
      <motion.div
        className="story-text-wrapper"
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        {/* ① 見出し */}
        <h3 className="story-heading">
          {splitToChars(headingText).map((char, i) => (
            <motion.span
              key={`heading-char-${i}`}
              variants={charVariants}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </h3>

        {/* ② 本文。改行は <br/> で表現 */}
        <p className="story-body">
          {splitToChars(bodyText).map((char, i) => {
            if (char === "\n") {
              return <br key={`body-br-${i}`} />;
            }
            return (
              <motion.span
                key={`body-char-${i}`}
                variants={charVariants}
                style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
              >
                {char}
              </motion.span>
            );
          })}
        </p>
      </motion.div>
    </div>
  );
}
