"use client";

import React from 'react';

const StatsDisplay = () => {
  return (
    <div className="flex flex-col w-full max-w-[350px] mb-10">
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black"># Investments</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">32</p>
      </div>
      
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black"># Markups</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">13</p>
      </div>
      
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black"># Acquisitions</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">2</p>
      </div>
      
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black"># Busts</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">4</p>
      </div>
      
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black">TVPI</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">1.44x</p>
      </div>
      
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black">Gross Multiple</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">1.22x</p>
      </div>
      
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black">Net Multiple</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">1.12x</p>
      </div>
      
      <div className="mb-2">
        <h3 className="text-xl font-medium mb-1 text-black">IRR</h3>
        <p className="text-5xl font-bold mt-0 mb-4 leading-tight text-black">10%</p>
      </div>
    </div>
  );
};

export default StatsDisplay;