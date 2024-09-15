"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'


const words = [
    'Beautiful',
    'Affordable',
    'Unique',
    'Durable',
    'Stylish',
    'Customizable',
    'Modern',
    'Timeless',
    'Creative',
    'Elegant'
]

const HeadingUi = ({ heading, text }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const textParts = text.split('\n').filter(part => part.trim() !== '');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])


    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="gradient-heading !leading-tight text-5xl lg:text-6xl font-bold mb-4 tracking-[-2px]">
                {heading}
            </h1>
            <div className="h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentWordIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-semibold gradient-heading"
                    >
                        {words[currentWordIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HeadingUi;
