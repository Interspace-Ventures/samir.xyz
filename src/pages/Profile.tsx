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
    <div className="space-y-8">
      <RevealOnScroll>
        <section className="space-y-4">
          <div className="max-w-3xl flex items-center justify-between">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold">
                Hey - I'm Samir.
              </h1>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#7343d0] mt-4">
                I drive business impact at fintechs.
              </h2>
            </div>
            <div className="hidden sm:block relative w-40 h-40 flex-shrink-0 ml-4">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-full h-full rounded-full" />
                </div>
              )}
              {!imageError ? (
                <div className={`relative w-full h-full ${imageLoadingHighRes ? 'blur-sm' : ''}`}>
                  {/* Low-res placeholder */}
                  <img
                    src="/assets/images/profile/profile-photo-placeholder.png"
                    alt=""
                    className={`absolute inset-0 w-full h-full rounded-full border-2 border-[#7343d0] object-cover p-[7px] transition-opacity duration-300
                      ${imageLoading ? 'opacity-0' : imageLoadingHighRes ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handlePlaceholderLoad}
                    onError={handleImageError}
                  />
                  {/* High-res image */}
                  <picture>
                    <source 
                      srcSet="/assets/images/profile/profile-photo.webp" 
                      type="image/webp"
                      onError={() => {
                        console.log('WebP format not supported for profile image, falling back to PNG');
                      }}
                    />
                    <img 
                      src="/assets/images/profile/profile-photo.png"
                      alt="Profile" 
                      className={`absolute inset-0 w-full h-full rounded-full border-2 border-[#7343d0] object-cover p-[7px] transition-opacity duration-500
                        ${imageLoadingHighRes ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={handleHighResLoad}
                      onError={handleImageError}
                    />
                  </picture>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center rounded-full border-2 border-[#7343d0] bg-gray-100">
                  <span className="text-3xl">S</span>
                </div>
              )}
            </div>
          </div>
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
            where we're expanding financial access to help users do more with their money. Previously I built Strategic Finance at{" "}
            <a 
              href="https://www.hudsonrivertrading.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="external-link"
            >
              HRT
            </a>{" "}
            which uses algorithms to drive efficiency in markets. Prior to that, I drove financial partnerships at{" "}
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
          <p>
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