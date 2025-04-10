"use client";

import React from "react";
import Link from "next/link";

export default function DirectNavbar() {
  return (
    <div className="fixed top-0 left-0 w-screen h-20 bg-[#5239cc] text-white z-[1000] shadow-md font-alexandria">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto h-full px-6 flex-nowrap">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-[#4285f4] to-[#8c5ad7] w-12 h-12 flex items-center justify-center rounded-md mr-4">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <span className="text-2xl font-medium">samir.xyz</span>
        </div>

        {/* Navigation */}
        <div className="flex justify-end items-center gap-8 flex-nowrap flex-shrink-0">
          <Link href="/profile">
            <span className="text-white text-base uppercase tracking-wider">ABOUT</span>
          </Link>
          <Link href="/portfolio">
            <span className="text-white text-base uppercase tracking-wider">PORTFOLIO</span>
          </Link>
          <Link href="/ventures">
            <span className="text-white text-base uppercase tracking-wider">VENTURES</span>
          </Link>
        </div>
      </div>
    </div>
  );
}