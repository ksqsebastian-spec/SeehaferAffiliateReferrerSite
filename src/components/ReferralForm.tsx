"use client";

import { useState } from "react";
import { validateForm, type ReferralFormData } from "@/types";
import { generateRefCode } from "@/lib/generateRefCode";
import { generateMailtoLink } from "@/lib/generateMailtoLink";
import { generatePDF } from "@/lib/generatePDF";

export default function ReferralForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noPaypal, setNoPaypal] = useState(false);
  const [iban, setIban] = useState("");
  const [kontoinhaber, setKontoinhaber] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [refCode] = useState(generateRefCode);

  const form: ReferralFormData = { name, email, noPaypal, iban, kontoinhaber };
  const errors = validateForm(form);
  const isReady =
    Object.keys(errors).length === 0 && name.length > 0 && email.length > 0;

  const referralData = { ...form, refCode };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <section className="pb-8">
      <div
        className="rounded-2xl bg-white p-5 sm:p-8"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-500 uppercase"
            >
              Dein Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Lisa Schmidt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                touched.name && errors.name
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-500 uppercase"
            >
              Deine E-Mail / PayPal
            </label>
            <input
              id="email"
              type="email"
              placeholder="lisa.schmidt@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                touched.email && errors.email
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* No PayPal checkbox */}
          <div>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={noPaypal}
                onChange={(e) => setNoPaypal(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-800">
                {noPaypal ? "▲" : "▼"} Ich habe kein PayPal
              </span>
            </label>

            {/* Bank details */}
            {noPaypal && (
              <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Gib deine Bankverbindung an, damit wir dir die Provision
                  überweisen können.
                </p>
                <div>
                  <label
                    htmlFor="kontoinhaber"
                    className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-500 uppercase"
                  >
                    Kontoinhaber
                  </label>
                  <input
                    id="kontoinhaber"
                    type="text"
                    placeholder="Lisa Schmidt"
                    value={kontoinhaber}
                    onChange={(e) => setKontoinhaber(e.target.value)}
                    onBlur={() => handleBlur("kontoinhaber")}
                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                      touched.kontoinhaber && errors.kontoinhaber
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                  />
                  {touched.kontoinhaber && errors.kontoinhaber && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.kontoinhaber}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="iban"
                    className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-500 uppercase"
                  >
                    IBAN
                  </label>
                  <input
                    id="iban"
                    type="text"
                    placeholder="DE89 3704 0044 0532 0130 00"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    onBlur={() => handleBlur("iban")}
                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                      touched.iban && errors.iban
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                  />
                  {touched.iban && errors.iban && (
                    <p className="mt-1 text-xs text-red-500">{errors.iban}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Template block preview */}
          {isReady && (
            <div className="rounded-lg bg-orange-50 p-4">
              <p className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Dein Empfehlungsblock
              </p>
              <div className="space-y-1 text-sm text-gray-800">
                <p className="text-gray-400">———————————</p>
                <p className="font-bold">📌 Empfehlung</p>
                <p>Dieser Auftrag wurde</p>
                <p>empfohlen von:</p>
                <p className="font-semibold">{name}</p>
                <p>{email}</p>
                {noPaypal && kontoinhaber && (
                  <>
                    <p className="mt-2 text-xs font-semibold text-gray-500">
                      Bankverbindung:
                    </p>
                    <p>Kontoinhaber: {kontoinhaber}</p>
                    <p>IBAN: {iban}</p>
                  </>
                )}
                <p>Ref: {refCode}</p>
                <p className="text-gray-400">———————————</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <a
              href={isReady ? generateMailtoLink(referralData) : undefined}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-all ${
                isReady
                  ? "hover:-translate-y-px hover:shadow-md"
                  : "pointer-events-none opacity-50"
              }`}
              aria-disabled={!isReady}
            >
              ✉️ Per E-Mail senden
            </a>
            <button
              type="button"
              onClick={() => generatePDF(referralData)}
              disabled={!isReady}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-all ${
                isReady
                  ? "bg-orange-500 hover:-translate-y-px hover:bg-orange-600 hover:shadow-md"
                  : "cursor-not-allowed bg-orange-300 opacity-50"
              }`}
            >
              📄 Als PDF herunterladen
            </button>
          </div>

          {/* Privacy note */}
          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            🔒 Deine Daten werden nur für die Provisions-Auszahlung verwendet.
          </p>
        </div>
      </div>
    </section>
  );
}
