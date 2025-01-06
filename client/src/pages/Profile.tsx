import React, { type FC } from "react";

export const Profile: FC = () => {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold">
          Hey - I'm Samir.
        </h1>
        <h2 className="text-2xl sm:text-3xl">
          I drive business impact at fintechs.
        </h2>
      </section>

      <section className="max-w-3xl space-y-4 text-lg">
        <p>
          Today, I am leading Finance & Strategy for the Financial Partnerships team at{" "}
          <a href="https://cash.app" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">Cash App</a>{" "}
          where we're expanding financial access to help users do more with their money. Previously I built Strategic Finance at{" "}
          <a href="https://www.hudsonrivertrading.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">HRT</a>{" "}
          which uses algorithms to drive efficiency in markets. Prior to that, I drove financial partnerships at{" "}
          <a href="https://www.unit.co" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">Unit</a>, 
          which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
          <a href="https://www.chime.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">Chime</a>. 
          Earlier, I was the first finance hire at{" "}
          <a href="https://sift.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">Sift</a>. 
          I got my start in investment banking in the Financial Institutions Group at{" "}
          <a href="https://www.jpmorgan.com/investment-banking" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">JP Morgan</a>{" "}
          covering market structure and asset management.
        </p>

        <p>
          In my free time, I write over-engineered threads on{" "}
          <a href="https://x.com/heysamir_" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">Twitter</a>, 
          share perspectives on{" "}
          <a href="https://perspectives.samir.xyz" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">Substack</a>{" "}
          and write over-engineered fintech posts at{" "}
          <a href="https://interspace.samir.xyz" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">Interspace</a>. 
          I'm also learning to{" "}
          <a href="https://github.com/hey-samir" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">code at the speed of thought</a>{" "}
          via Replit AI.
        </p>
      </section>
    </div>
  );
};

export default Profile;