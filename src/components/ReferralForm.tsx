"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import { Mail, FileText, Lock } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { referralSchema, type ReferralFormData } from "@/types";
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
  const [refCode, setRefCode] = useState("");

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "" },
  });

  const name = watch("name");
  const email = watch("email");

  useEffect(() => {
    setRefCode(generateRefCode());
  }, []);

  const referralData = { name, email, refCode };

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
              {...register("name")}
              className={cn(
                inputClass,
                errors.name ? "border-red-400" : "border-border-subtle"
              )}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
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
              {...register("email")}
              className={cn(
                inputClass,
                errors.email ? "border-red-400" : "border-border-subtle"
              )}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Template block */}
          <AnimatePresence>
            {isValid && <TemplateBlock data={referralData} />}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <a
              href={isValid ? generateMailtoLink(referralData) : undefined}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex-1",
                !isValid && "pointer-events-none opacity-50"
              )}
              aria-disabled={!isValid}
            >
              <Mail size={16} />
              Per E-Mail senden
            </a>
            <button
              type="button"
              onClick={() => generatePDF(referralData)}
              disabled={!isValid}
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
