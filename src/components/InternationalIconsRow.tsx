import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function InternationalIconsRow() {
  const icons = [
    {
      id: 'baalbek',
      name: 'Baalbek',
      viewBox: '0 0 100 120',
      svg: (
        <g>
          {/* Base platform */}
          <rect x="10" y="95" width="80" height="8" fill="#D4C5B0" opacity="0.9" />
          <rect x="12" y="93" width="76" height="2" fill="#E8DCC8" />
          
          {/* Six classical columns */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 15 + i * 13;
            return (
              <g key={i}>
                {/* Column shaft with fluting */}
                <rect x={x} y="25" width="10" height="70" fill="#C9A86A" opacity="0.85" />
                <rect x={x} y="25" width="10" height="70" fill="url(#columnGradient)" />
                
                {/* Subtle fluting lines */}
                <line x1={x + 2} y1="25" x2={x + 2} y2="95" stroke="#B8956A" strokeWidth="0.5" opacity="0.4" />
                <line x1={x + 5} y1="25" x2={x + 5} y2="95" stroke="#B8956A" strokeWidth="0.5" opacity="0.4" />
                <line x1={x + 8} y1="25" x2={x + 8} y2="95" stroke="#B8956A" strokeWidth="0.5" opacity="0.4" />
                
                {/* Capital (top) */}
                <rect x={x - 1} y="20" width="12" height="5" fill="#D4C5B0" opacity="0.9" />
                <polygon points={`${x - 1},20 ${x + 11},20 ${x + 10},25 ${x},25`} fill="#E8DCC8" />
                
                {/* Base (bottom) */}
                <rect x={x - 1} y="93" width="12" height="4" fill="#D4C5B0" opacity="0.9" />
                <polygon points={`${x},93 ${x + 10},93 ${x + 11},97 ${x - 1},97`} fill="#B8956A" opacity="0.6" />
              </g>
            );
          })}
          
          {/* Entablature (top beam) */}
          <rect x="10" y="18" width="80" height="3" fill="#D4C5B0" opacity="0.85" />
          <rect x="10" y="18" width="80" height="1.5" fill="#E8DCC8" />
          
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="columnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8DCC8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#C9A86A" stopOpacity="1" />
              <stop offset="100%" stopColor="#B8956A" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </g>
      ),
    },
    {
      id: 'eiffel',
      name: 'Eiffel Tower',
      viewBox: '0 0 100 140',
      svg: (
        <g>
          {/* Base platform */}
          <rect x="20" y="125" width="60" height="6" fill="#D4C5B0" opacity="0.9" />
          <rect x="22" y="123" width="56" height="2" fill="#E8DCC8" />
          
          {/* Main tower shaft - tapered */}
          <polygon points="50,10 48,35 45,70 42,110 58,110 55,70 52,35 50,10" fill="#C9A86A" opacity="0.85" />
          <polygon points="50,10 48,35 45,70 42,110 58,110 55,70 52,35 50,10" fill="url(#towerGradient)" />
          
          {/* Horizontal cross-braces */}
          <line x1="42" y1="40" x2="58" y2="40" stroke="#B8956A" strokeWidth="1.5" opacity="0.7" />
          <line x1="42" y1="65" x2="58" y2="65" stroke="#B8956A" strokeWidth="1.5" opacity="0.7" />
          <line x1="42" y1="90" x2="58" y2="90" stroke="#B8956A" strokeWidth="1.5" opacity="0.7" />
          
          {/* Diagonal bracing */}
          <line x1="42" y1="40" x2="45" y2="70" stroke="#B8956A" strokeWidth="0.8" opacity="0.5" />
          <line x1="58" y1="40" x2="55" y2="70" stroke="#B8956A" strokeWidth="0.8" opacity="0.5" />
          <line x1="45" y1="70" x2="42" y2="110" stroke="#B8956A" strokeWidth="0.8" opacity="0.5" />
          <line x1="55" y1="70" x2="58" y2="110" stroke="#B8956A" strokeWidth="0.8" opacity="0.5" />
          
          {/* Top spire */}
          <polygon points="50,5 48,10 52,10" fill="#E8DCC8" />
          <line x1="50" y1="5" x2="50" y2="10" stroke="#B8956A" strokeWidth="0.5" />
          
          {/* Defs */}
          <defs>
            <linearGradient id="towerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8DCC8" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#C9A86A" stopOpacity="1" />
              <stop offset="100%" stopColor="#B8956A" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </g>
      ),
    },
    {
      id: 'burj',
      name: 'Burj Khalifa',
      viewBox: '0 0 100 150',
      svg: (
        <g>
          {/* Base platform */}
          <rect x="35" y="135" width="30" height="8" fill="#D4C5B0" opacity="0.9" />
          <rect x="37" y="133" width="26" height="2" fill="#E8DCC8" />
          
          {/* Main tower - extremely tapered */}
          <polygon points="50,8 48,25 46,50 44,80 42,110 58,110 56,80 54,50 52,25 50,8" fill="#C9A86A" opacity="0.85" />
          <polygon points="50,8 48,25 46,50 44,80 42,110 58,110 56,80 54,50 52,25 50,8" fill="url(#burjGradient)" />
          
          {/* Vertical ridges for architectural detail */}
          <line x1="48" y1="8" x2="44" y2="110" stroke="#B8956A" strokeWidth="0.6" opacity="0.4" />
          <line x1="52" y1="8" x2="56" y2="110" stroke="#B8956A" strokeWidth="0.6" opacity="0.4" />
          
          {/* Horizontal setbacks */}
          <line x1="46" y1="35" x2="54" y2="35" stroke="#B8956A" strokeWidth="0.8" opacity="0.5" />
          <line x1="44" y1="65" x2="56" y2="65" stroke="#B8956A" strokeWidth="0.8" opacity="0.5" />
          <line x1="42" y1="95" x2="58" y2="95" stroke="#B8956A" strokeWidth="0.8" opacity="0.5" />
          
          {/* Top spire - very pointed */}
          <polygon points="50,5 49,8 51,8" fill="#E8DCC8" />
          <line x1="50" y1="5" x2="50" y2="8" stroke="#B8956A" strokeWidth="0.4" />
          
          {/* Defs */}
          <defs>
            <linearGradient id="burjGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8DCC8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#C9A86A" stopOpacity="1" />
              <stop offset="100%" stopColor="#B8956A" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </g>
      ),
    },
    {
      id: 'saudi',
      name: 'Saudi Arabia',
      viewBox: '0 0 100 100',
      svg: (
        <g>
          {/* Palm tree trunk */}
          <rect x="42" y="35" width="16" height="35" fill="#8B7355" opacity="0.9" />
          <rect x="42" y="35" width="16" height="35" fill="url(#trunkGradient)" />
          
          {/* Palm fronds - radiating */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 50;
            const y1 = 35;
            const x2 = 50 + Math.cos(rad) * 20;
            const y2 = 35 + Math.sin(rad) * 20;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#6B8E23"
                strokeWidth="1.5"
                opacity="0.85"
              />
            );
          })}
          
          {/* Crossed swords below palm */}
          {/* Left sword */}
          <line x1="25" y1="65" x2="45" y2="75" stroke="#C9A86A" strokeWidth="2.5" opacity="0.9" />
          <polygon points="25,65 23,63 27,67" fill="#C9A86A" opacity="0.9" />
          
          {/* Right sword */}
          <line x1="75" y1="65" x2="55" y2="75" stroke="#C9A86A" strokeWidth="2.5" opacity="0.9" />
          <polygon points="75,65 77,63 73,67" fill="#C9A86A" opacity="0.9" />
          
          {/* Sword hilts */}
          <circle cx="25" cy="65" r="1.5" fill="#D4C5B0" opacity="0.8" />
          <circle cx="75" cy="65" r="1.5" fill="#D4C5B0" opacity="0.8" />
          
          {/* Defs */}
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A0826D" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8B7355" stopOpacity="1" />
              <stop offset="100%" stopColor="#6B5344" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </g>
      ),
    },
    {
      id: 'switzerland',
      name: 'Switzerland',
      viewBox: '0 0 100 100',
      svg: (
        <g>
          {/* White cross - centered and clean */}
          {/* Vertical bar */}
          <rect x="40" y="25" width="20" height="50" fill="#FFFFFF" opacity="0.95" />
          
          {/* Horizontal bar */}
          <rect x="25" y="40" width="50" height="20" fill="#FFFFFF" opacity="0.95" />
          
          {/* Subtle shadow/depth on cross edges */}
          <rect x="40" y="25" width="1" height="50" fill="#E8DCC8" opacity="0.4" />
          <rect x="25" y="40" width="50" height="1" fill="#E8DCC8" opacity="0.4" />
          
          {/* Subtle background circle for context (very light) */}
          <circle cx="50" cy="50" r="38" fill="none" stroke="#C9A86A" strokeWidth="0.5" opacity="0.2" />
        </g>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative w-full bg-background py-16 md:py-20">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
        >
          {icons.map((icon) => (
            <motion.div
              key={icon.id}
              variants={iconVariants}
              className="group"
            >
              <Link
                to="/consultation"
                className="flex flex-col items-center gap-4 cursor-pointer"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center"
                >
                  {/* Subtle glow on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-full bg-accent-gold/10 blur-xl"
                  />

                  {/* SVG Icon */}
                  <svg
                    viewBox={icon.viewBox}
                    className="w-full h-full drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {icon.svg}
                  </svg>
                </motion.div>

                {/* Label - subtle, appears on hover */}
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-paragraph text-xs md:text-sm text-optional-navy/60 uppercase tracking-wider text-center"
                >
                  {icon.name}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
