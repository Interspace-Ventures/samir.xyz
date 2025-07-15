/**
 * Animation Utilities
 * 
 * Centralized animation configurations and utilities using Framer Motion.
 * Provides consistent animation behavior across the application.
 */

import { ANIMATION_DURATIONS, ANIMATION_EASING } from '../constants';
import type { AnimationVariants } from '../types';

// Base animation variants
export const fadeInUp: AnimationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: ANIMATION_EASING.EASE_OUT,
    },
  },
};

export const fadeIn: AnimationVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: ANIMATION_EASING.EASE_OUT,
    },
  },
};

export const scaleIn: AnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: ANIMATION_EASING.EASE_OUT,
    },
  },
};

export const slideInFromLeft: AnimationVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: ANIMATION_EASING.EASE_OUT,
    },
  },
};

export const slideInFromRight: AnimationVariants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: ANIMATION_EASING.EASE_OUT,
    },
  },
};

// Staggered animations for lists
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: AnimationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: ANIMATION_EASING.EASE_OUT,
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: {
    duration: ANIMATION_DURATIONS.FAST,
    ease: ANIMATION_EASING.EASE_OUT,
  },
};

export const hoverLift = {
  y: -5,
  transition: {
    duration: ANIMATION_DURATIONS.FAST,
    ease: ANIMATION_EASING.EASE_OUT,
  },
};

// Utility functions for creating custom animations
export function createStaggerAnimation(
  delay: number = 0.1,
  duration: number = ANIMATION_DURATIONS.NORMAL
) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        duration,
      },
    },
  };
}

export function createFadeAnimation(
  delay: number = 0,
  duration: number = ANIMATION_DURATIONS.NORMAL
): AnimationVariants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: ANIMATION_EASING.EASE_OUT,
      },
    },
  };
}

export function createSlideAnimation(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 20,
  delay: number = 0,
  duration: number = ANIMATION_DURATIONS.NORMAL
): AnimationVariants {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        delay,
        duration,
        ease: ANIMATION_EASING.EASE_OUT,
      },
    },
  };
}