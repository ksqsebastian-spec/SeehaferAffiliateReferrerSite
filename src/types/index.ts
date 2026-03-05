import { z } from "zod/v4";

const nameRegex = /^[a-zA-ZäöüÄÖÜßéèêàáâ\s\-]+$/;
const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/;

export const referralSchema = z
  .object({
    name: z
      .string()
      .min(1, "Bitte gib deinen Namen ein.")
      .max(80, "Name darf maximal 80 Zeichen haben.")
      .regex(
        nameRegex,
        "Nur Buchstaben, Leerzeichen und Bindestriche erlaubt."
      ),
    email: z
      .string()
      .min(1, "Bitte gib deine E-Mail ein.")
      .max(120, "E-Mail darf maximal 120 Zeichen haben.")
      .email("Bitte gib eine gültige E-Mail-Adresse ein."),
    noPaypal: z.boolean(),
    iban: z.string().optional(),
    kontoinhaber: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.noPaypal) {
        return (
          !!data.iban &&
          ibanRegex.test(data.iban.replace(/\s/g, "").toUpperCase())
        );
      }
      return true;
    },
    { message: "Bitte gib eine gültige IBAN ein.", path: ["iban"] }
  )
  .refine(
    (data) => {
      if (data.noPaypal) {
        return !!data.kontoinhaber && nameRegex.test(data.kontoinhaber);
      }
      return true;
    },
    {
      message: "Bitte gib den Kontoinhaber ein.",
      path: ["kontoinhaber"],
    }
  );

export type ReferralFormData = z.infer<typeof referralSchema>;

export interface ReferralData {
  name: string;
  email: string;
  refCode: string;
  noPaypal: boolean;
  iban?: string;
  kontoinhaber?: string;
}
