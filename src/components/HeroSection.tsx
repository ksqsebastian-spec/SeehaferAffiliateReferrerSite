export default function HeroSection() {
  return (
    <section className="fade-in pb-12 text-center">
      <h1
        className="text-navy font-extrabold"
        style={{ fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.15 }}
      >
        Empfiehl deinen Handwerker.
        <br />
        <span className="text-orange">Verdiene mit.</span>
      </h1>
      <p className="text-text-muted mx-auto mt-4 max-w-[360px]">
        Dein Kumpel braucht einen Tischler? Sag ihm Bescheid — und verdiene eine
        Provision, wenn er den Auftrag erteilt.
      </p>
    </section>
  );
}
