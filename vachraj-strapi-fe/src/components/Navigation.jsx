"use client"
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useAnimation } from "framer-motion";

const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/product",
    name: "Products",
  },
];

const Navigation = () => {
  let pathname = usePathname() || "/";
  const navRef = useRef(null);
  const indicatorControls = useAnimation();

  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = navRef.current?.querySelector(`[data-active="true"]`);
      if (activeItem) {
        const { left, top, width, height } = activeItem.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        indicatorControls.start({
          left: left - navRect.left - 10,
          top: top - navRect.top - 16,
          width: width + 20,
          height: height,
          transition: { type: "spring", bounce: 5, stiffness: 180, damping: 9 }
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [pathname, indicatorControls]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] border-b border-slate-900/10 supports-backdrop-blur:bg-white/95 full layout-container bg-popover/75">
      <nav ref={navRef} className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200 py-4">
        <ul className="flex gap-6 relative">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path) && (item.path === "/" ? pathname === "/" : true);
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  data-active={isActive}
                  className={`relative p-2 px-3 hover:text-sky-500 dark:hover:text-sky-400 ${isActive ? 'text-sky-500 dark:text-sky-400' : ''}`}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
          <motion.div
            className="absolute bg-sky-500/10 dark:bg-sky-400/10 rounded-md -z-10"
            initial={false}
            animate={indicatorControls}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;