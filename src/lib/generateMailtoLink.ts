import type { ReferralData } from "@/types";

export function generateMailtoLink(data: ReferralData): string {
  const subject = encodeURIComponent("Empfehlung – Seehafer Elemente");

  const body = encodeURIComponent(
    `Hey!

Ich hab dir Seehafer Elemente empfohlen — die machen richtig gute Tischlerarbeiten.

Falls du Interesse hast, schreib denen einfach ne Mail an info@seehafer-elemente.de und häng den Block hier unten in deine Anfrage mit rein. Dann wissen die Bescheid.

———————————
📌 Empfehlung
Dieser Auftrag wurde
empfohlen von:
${data.name}
${data.email}
Ref: ${data.refCode}
———————————

Viele Grüße!`
  );

  return `mailto:?subject=${subject}&body=${body}`;
}
