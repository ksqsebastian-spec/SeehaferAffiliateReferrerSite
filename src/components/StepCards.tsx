import { ArrowRight } from "lucide-react";

const steps = [
  { num: 1, title: "Ausfüllen", desc: "Name + PayPal" },
  { num: 2, title: "Senden", desc: "Per Mail oder PDF" },
  { num: 3, title: "Verdienen", desc: "Provision bei Auftrag" },
];

export default function StepCards() {
  return (
    <section className="fade-in pb-12">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center gap-3">
            <div className="bg-bg-card shadow-card flex-1 rounded-[var(--radius)] p-4">
              <div className="bg-navy mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                {step.num}
              </div>
              <p className="text-navy text-sm font-bold">{step.title}</p>
              <p className="text-text-muted text-[12px]">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight
                className="text-text-muted hidden shrink-0 sm:block"
                size={18}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
