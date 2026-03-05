"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, FileText, Lock, ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  validateForm,
  type ReferralFormData,
  type ValidationErrors,
} from "@/types";
import { generateRefCode } from "@/lib/generateRefCode";
import { generateMailtoLink } from "@/lib/generateMailtoLink";
import { generatePDF } from "@/lib/generatePDF";
import TemplateBlock from "./TemplateBlock";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-white hover:bg-orange-hover hover:-translate-y-px hover:shadow-card-hover",
        secondary:
          "border border-border-subtle bg-bg-card text-navy hover:-translate-y-px hover:shadow-card-hover",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const inputClass =
  "w-full rounded-[var(--radius-sm)] border bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20";

const labelClass =
  "mb-1.5 block text-[12px] font-semibold tracking-[1px] text-text-muted uppercase";

export default function ReferralForm() {
  const [refCode] = useState(() => generateRefCode());
  const [form, setForm] = useState<ReferralFormData>({
    name: "",
    email: "",
    noPaypal: false,
    iban: "",
    kontoinhaber: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateField = useCallback(
    (field: keyof ReferralFormData, value: string | boolean) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        setErrors(validateForm(next));
        return next;
      });
    },
    []
  );

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const referralData = {
    ...form,
    refCode,
  };

  const validationErrors = validateForm(form);
  const isReady =
    Object.keys(validationErrors).length === 0 &&
    form.name.length > 0 &&
    form.email.length > 0;

  return (
    <section className="fade-in pb-8">
      <div className="bg-bg-card shadow-card rounded-[var(--radius)] p-5 sm:p-8">
        <div className="space-y-5">
          {/* Name input */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Dein Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Lisa Schmidt"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={cn(
                inputClass,
                touched.name && errors.name
                  ? "border-red-400"
                  : "border-border-subtle"
              )}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Deine E-Mail / PayPal
            </label>
            <input
              id="email"
              type="email"
              placeholder="lisa.schmidt@gmail.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={cn(
                inputClass,
                touched.email && errors.email
                  ? "border-red-400"
                  : "border-border-subtle"
              )}
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
                checked={form.noPaypal}
                onChange={(e) => updateField("noPaypal", e.target.checked)}
                className="text-orange focus:ring-orange border-border-subtle h-4 w-4 rounded"
              />
              <span className="text-text-main flex items-center gap-1 text-sm">
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-text-muted transition-transform duration-200",
                    form.noPaypal && "rotate-180"
                  )}
                />
                Ich habe kein PayPal
              </span>
            </label>

            {/* Bank details (expandable) */}
            <AnimatePresence>
              {form.noPaypal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-border-subtle mt-4 space-y-4 rounded-[var(--radius-sm)] border bg-[#fafaf8] p-4">
                    <p className="text-text-muted text-[12px]">
                      Gib deine Bankverbindung an, damit wir dir die Provision
                      überweisen können.
                    </p>
                    <div>
                      <label htmlFor="kontoinhaber" className={labelClass}>
                        Kontoinhaber
                      </label>
                      <input
                        id="kontoinhaber"
                        type="text"
                        placeholder="Lisa Schmidt"
                        value={form.kontoinhaber}
                        onChange={(e) =>
                          updateField("kontoinhaber", e.target.value)
                        }
                        onBlur={() => handleBlur("kontoinhaber")}
                        className={cn(
                          inputClass,
                          touched.kontoinhaber && errors.kontoinhaber
                            ? "border-red-400"
                            : "border-border-subtle"
                        )}
                      />
                      {touched.kontoinhaber && errors.kontoinhaber && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.kontoinhaber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="iban" className={labelClass}>
                        IBAN
                      </label>
                      <input
                        id="iban"
                        type="text"
                        placeholder="DE89 3704 0044 0532 0130 00"
                        value={form.iban}
                        onChange={(e) => updateField("iban", e.target.value)}
                        onBlur={() => handleBlur("iban")}
                        className={cn(
                          inputClass,
                          touched.iban && errors.iban
                            ? "border-red-400"
                            : "border-border-subtle"
                        )}
                      />
                      {touched.iban && errors.iban && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.iban}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Template block */}
          <AnimatePresence>
            {isReady && <TemplateBlock data={referralData} />}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <a
              href={isReady ? generateMailtoLink(referralData) : undefined}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex-1",
                !isReady && "pointer-events-none opacity-50"
              )}
              aria-disabled={!isReady}
            >
              <Mail size={16} />
              Per E-Mail senden
            </a>
            <button
              type="button"
              onClick={() => generatePDF(referralData)}
              disabled={!isReady}
              className={cn(buttonVariants({ variant: "primary" }), "flex-1")}
            >
              <FileText size={16} />
              Als PDF herunterladen
            </button>
          </div>

          {/* Privacy note */}
          <p className="text-text-muted flex items-center gap-1.5 text-[12px]">
            <Lock size={12} className="shrink-0" />
            Deine Daten werden nur für die Provisions-Auszahlung verwendet.
          </p>
        </div>
      </div>
    </section>
  );
}
