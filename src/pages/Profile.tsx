import React, { type FC, useState } from "react";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { Skeleton } from "../components/ui/skeleton";

export const Profile: FC = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoadingHighRes, setImageLoadingHighRes] = useState(true);

  const handleImageError = () => {
    console.error('Failed to load profile image');
    setImageError(true);
    setImageLoading(false);
    setImageLoadingHighRes(false);
  };

  const handlePlaceholderLoad = () => {
    setImageLoading(false);
  };

  const handleHighResLoad = () => {
    setImageLoadingHighRes(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <RevealOnScroll>
        <section className="py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex flex-col-reverse md:flex-row md:items-center gap-8">
              <div className="w-full md:w-2/3 text-center md:text-left flex flex-col">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Hey - I'm Samir.
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#7343d0] mt-3 md:mt-4">
                  I drive business impact at fintechs.
                </h2>
              </div>
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 flex-shrink-0 relative mb-6 md:mb-0 md:-mt-8 transition-all duration-300 ease-in-out">
                {imageLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="w-full h-full rounded-full" />
                  </div>
                )}
                {!imageError ? (
                  <div className={`relative w-full h-full ${imageLoadingHighRes ? 'blur-sm' : ''} transition-all duration-300`}>
                    <img
                      src="/assets/images/profile/samir-profile-photo-placeholder.png"
                      alt=""
                      className={`absolute inset-0 w-full h-full rounded-full border-2 border-[#7343d0] object-cover p-[6px] transition-all duration-300 ease-in-out
                        ${imageLoading ? 'opacity-0' : imageLoadingHighRes ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={handlePlaceholderLoad}
                      onError={handleImageError}
                    />
                    <picture>
                      <source 
                        srcSet="/assets/images/profile/samir-profile-photo.webp"
                        type="image/webp" 
                      />
                      <img 
                        src="/assets/images/profile/samir-profile-photo.png"
                        alt="Profile" 
                        className={`absolute inset-0 w-full h-full rounded-full border-2 border-[#7343d0] object-cover p-[6px] transition-all duration-300 ease-in-out
                          ${imageLoadingHighRes ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={handleHighResLoad}
                        onError={handleImageError}
                      />
                    </picture>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-full border-2 border-[#7343d0] bg-gray-100 dark:bg-gray-800 transition-all duration-300">
                    <span className="text-2xl md:text-3xl font-bold">S</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>
      <RevealOnScroll>
        <section className="max-w-3xl mx-auto space-y-4 md:space-y-6">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            Today, I am leading Finance & Strategy for the Financial Partnerships team at{" "}
            <a 
              href="https://cash.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="external-link"
            >
              Cash App
            </a>{" "}
            where we're expanding financial access to help users do more with their money. Previously I built Strategic Finance at{" "}
            <a 
              href="https://www.hudsonrivertrading.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="external-link"
            >
              HRT
            </a>{" "}
            which uses algorithms to drive efficiency in markets.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            Prior to that, I drove financial partnerships at{" "}
            <a 
              href="https://www.unit.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="external-link"
            >
              Unit
            </a>, 
            which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
            <a 
              href="https://www.chime.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              Chime
            </a>. 
            Earlier, I was the first finance hire at{" "}
            <a 
              href="https://sift.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              Sift
            </a>. 
            I got my start in investment banking in the Financial Institutions Group at{" "}
            <a 
              href="https://www.jpmorgan.com/investment-banking" 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              JP Morgan
            </a>{" "}
            covering market structure and asset management.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            In my free time, I write over-engineered threads on{" "}
            <a 
              href="https://x.com/heysamir_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              Twitter
            </a>, 
            share perspectives on{" "}
            <a 
              href="https://perspectives.samir.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              Substack
            </a>{" "}
            and write over-engineered fintech posts at{" "}
            <a 
              href="https://interspace.samir.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              Interspace
            </a>. 
            I'm also learning to{" "}
            <a 
              href="https://github.com/hey-samir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              code at the speed of thought
            </a>{" "}
            via Replit AI.
          </p>
        </section>
      </RevealOnScroll>
    </div>
  );
};

export default Profile;