"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const variants = (direction) => ({
  enter: {
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: {
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0
  }
});

const TransitionWrapper = ({ children }) => {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState('');
  const [direction, setDirection] = useState('forward');

  useEffect(() => {
    if (prevPathname) {
      setDirection(pathname > prevPathname ? 'backward' : 'forward');
    }
    setPrevPathname(pathname);
  }, [pathname]);

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants(direction)}
        transition={{ type: 'tween', duration: 0.5 }}
        style={{ position: 'absolute', width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionWrapper;
