import React from 'react';
import { motion } from 'framer-motion';

export default function Section({
  id,
  title,
  children: SectionContent,
  motion: { variants, transition } = {},
  styles = {}
}) {
  return (
    <motion.section
      id={id}
      className="section"
      variants={variants}
      transition={transition}
      initial="hidden"
      animate="visible"
      style={styles}
    >
      {/* <h2 className="section-title">{title}</h2> */}
      {/* 中央レイアウトやダミーを SectionContent 内で担う */}
      <SectionContent />
    </motion.section>
  );
}
