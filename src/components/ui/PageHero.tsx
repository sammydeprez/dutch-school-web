interface PageHeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative gradient-hero py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          {title}
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
}
