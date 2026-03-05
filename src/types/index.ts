import { z } from "zod/v4";

export const referralSchema = z.object({
  name: z
    .string()
    .min(1, "Bitte gib deinen Namen ein.")
    .max(80, "Name darf maximal 80 Zeichen haben.")
    .regex(
      /^[a-zA-ZäöüÄÖÜßéèêàáâ\s\-]+$/,
      "Nur Buchstaben, Leerzeichen und Bindestriche erlaubt."
    ),
  email: z
    .string()
    .min(1, "Bitte gib deine E-Mail ein.")
    .max(120, "E-Mail darf maximal 120 Zeichen haben.")
    .email("Bitte gib eine gültige E-Mail-Adresse ein."),
});

export type ReferralFormData = z.infer<typeof referralSchema>;

export interface ReferralData extends ReferralFormData {
  refCode: string;
}
