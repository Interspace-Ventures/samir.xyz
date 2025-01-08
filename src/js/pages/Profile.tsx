import React, { type FC } from "react";
import { RevealOnScroll } from "../components/RevealOnScroll";

export const Profile: FC = () => {
  return (
    <div className="space-y-8">
      <RevealOnScroll>
        <section className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold">
            Hey - I'm Samir.
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#7343d0]">
            I drive business impact at fintechs.
          </h2>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="max-w-3xl space-y-4 text-lg">
          <p>
            Today, I am leading Finance & Strategy for the Financial Partnerships team at{" "}
            <a 
              href="https://cash.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="external-link"
            >
              Cash App
            </a>{" "}
            where we're expanding financial access to help users do more with their money.
            {/* Rest of the content remains the same */}
          </p>
        </section>
      </RevealOnScroll>
    </div>
  );
};

export default Profile;
