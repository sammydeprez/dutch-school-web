'use client';

import { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
  showDecorations?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  children,
  showDecorations = true,
}: PageHeroProps) {
  return (
    <section className="relative gradient-hero py-20 lg:py-28 overflow-hidden">
      {/* Floating Decorative Elements */}
      {showDecorations && (
        <>
          <div
            className="
              absolute top-10 left-10 w-20 h-20
              bg-secondary/20 rounded-full blur-2xl
              animate-float-slow
            "
          />
          <div
            className="
              absolute bottom-10 right-10 w-32 h-32
              bg-primary/20 rounded-full blur-3xl
              animate-float-slow
            "
            style={{ animationDelay: '2s' }}
          />
          <div
            className="
              absolute top-1/2 left-1/4 w-16 h-16
              bg-accent/20 rounded-full blur-2xl
              animate-float
            "
            style={{ animationDelay: '1s' }}
          />
          <div
            className="
              absolute top-1/3 right-1/4 w-12 h-12
              bg-secondary/15 rounded-full blur-xl
              animate-float
            "
            style={{ animationDelay: '3s' }}
          />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Staggered Content Animation */}
        <h1
          className="
            text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6
            animate-fade-in-up
          "
        >
          {title}
        </h1>
        <p
          className="
            text-xl text-muted max-w-2xl mx-auto
            animate-fade-in-up
          "
          style={{ animationDelay: '150ms' }}
        >
          {subtitle}
        </p>
        {children && (
          <div
            className="mt-8 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
