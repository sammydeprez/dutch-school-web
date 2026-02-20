'use client';

import { ReactNode, useEffect, useRef, useState, createElement } from 'react';

type AnimationType =
  | 'fade-in-up'
  | 'fade-in-down'
  | 'fade-in-left'
  | 'fade-in-right'
  | 'fade-in'
  | 'scale-in';

type ElementTag = 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'span';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  as?: ElementTag;
  threshold?: number;
  staggerChildren?: boolean;
}

const animationClasses: Record<AnimationType, string> = {
  'fade-in-up': 'animate-fade-in-up',
  'fade-in-down': 'animate-fade-in-down',
  'fade-in-left': 'animate-fade-in-left',
  'fade-in-right': 'animate-fade-in-right',
  'fade-in': 'animate-fade-in',
  'scale-in': 'animate-scale-in',
};

export default function AnimatedSection({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className = '',
  as = 'div',
  threshold = 0.1,
  staggerChildren = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold]);

  const delayClass = delay > 0 ? `delay-${delay}` : '';
  const staggerClass = staggerChildren ? 'stagger-children' : '';

  // Build className string
  const combinedClassName = [
    !isVisible ? 'opacity-0' : '',
    isVisible ? animationClasses[animation] : '',
    isVisible ? delayClass : '',
    staggerClass,
    isVisible && staggerChildren ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = delay > 0 && !delayClass ? { animationDelay: `${delay}ms` } : undefined;

  return createElement(
    as,
    {
      ref,
      className: combinedClassName,
      style,
    },
    children
  );
}
