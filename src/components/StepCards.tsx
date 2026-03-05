export default function StepCards() {
  return (
    <section className="fade-in pb-10">
      <div
        className="rounded-2xl bg-white p-5 sm:p-6"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <p className="text-navy mb-4 text-sm font-bold">So funktioniert es:</p>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="bg-navy flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
              1
            </span>
            <div>
              <p className="text-navy text-sm font-semibold">
                Formular ausfullen
              </p>
              <p className="text-text-muted text-xs">
                Name und PayPal-Adresse (oder Bankverbindung) eingeben.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-navy flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
              2
            </span>
            <div>
              <p className="text-navy text-sm font-semibold">
                Empfehlungsblock weitergeben
              </p>
              <p className="text-text-muted text-xs">
                Per E-Mail, Gmail, Zwischenablage oder PDF — an die Person, die
                Tischlerarbeiten braucht.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-navy flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
              3
            </span>
            <div>
              <p className="text-navy text-sm font-semibold">
                Auftrag kommt zustande
              </p>
              <p className="text-text-muted text-xs">
                Die Person schickt eine Anfrage an Seehafer Elemente und fugt
                den Empfehlungsblock bei.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-orange flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
              4
            </span>
            <div>
              <p className="text-orange text-sm font-semibold">
                Provision erhalten
              </p>
              <p className="text-text-muted text-xs">
                Wenn ein Auftrag daraus entsteht, bekommst du deine Provision
                auf PayPal oder per Uberweisung.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
