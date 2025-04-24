import React from 'react';

const Banner = () => {
  return (
    <div className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Business Idea Evaluator
          </h1>
          <p className="text-2xl text-muted-foreground">
            ประเมินไอเดียธุรกิจของคุณอย่างมืออาชีพ
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
    </div>
  );
};

export default Banner; 