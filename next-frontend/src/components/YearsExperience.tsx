type YearsExperienceProps = {
  titleId?: string;
  compact?: boolean;
};

export default function YearsExperience({ titleId, compact = false }: YearsExperienceProps) {
  const yearsOfExperience = new Date().getFullYear() - 1995;
  const numberClass = compact ? 'text-[clamp(3.5rem,7vw,6rem)]' : 'text-[clamp(6rem,14vw,11rem)]';
  const yearsClass = compact ? 'text-[clamp(1.2rem,2.2vw,2rem)]' : 'text-[clamp(2rem,3.8vw,3.1rem)]';
  const titleClass = compact
    ? 'mt-1 text-[clamp(0.85rem,1.4vw,1.3rem)] text-white'
    : 'mt-2 text-[clamp(1.5rem,2.9vw,2.4rem)] text-navy';
  const sinceClass = compact
    ? 'mt-2 text-[clamp(0.58rem,0.9vw,0.78rem)] text-footer-muted'
    : 'mt-5 text-[0.95rem] text-ink';

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold leading-[0.78] text-gold ${numberClass}`}>{yearsOfExperience}</span>
      <div>
        <p className={`font-serif font-bold italic leading-none text-gold ${yearsClass}`}>años</p>
        <p
          id={titleId}
          className={`font-bold uppercase leading-none tracking-[0.02em] ${titleClass}`}
        >
          De experiencia
        </p>
        <p className={`font-bold uppercase tracking-[0.3em] ${sinceClass}`}>Desde 1995</p>
      </div>
    </div>
  );
}
