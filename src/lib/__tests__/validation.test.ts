import { describe, it, expect } from "vitest";
import { referralSchema } from "../../types";

const base = { noPaypal: false };

describe("referralSchema", () => {
  it("accepts valid name and email", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "Lisa Schmidt",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("accepts names with umlauts and special characters", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "Müller-Straße Öztürk",
      email: "test@test.de",
    });
    expect(result.success).toBe(true);
  });

  it("accepts names with accented characters", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "René Bélanger",
      email: "test@test.de",
    });
    expect(result.success).toBe(true);
  });

  it("rejects names with numbers", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "Lisa123",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects names with special symbols", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "Lisa@Schmidt",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects names exceeding 80 characters", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "A".repeat(81),
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "Lisa",
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects email exceeding 120 characters", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "Lisa",
      email: "a".repeat(110) + "@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = referralSchema.safeParse({
      ...base,
      name: "Lisa",
      email: "",
    });
    expect(result.success).toBe(false);
  });

  // Bank details tests
  it("accepts noPaypal=false without bank details", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "lisa@example.com",
      noPaypal: false,
    });
    expect(result.success).toBe(true);
  });

  it("accepts noPaypal=true with valid IBAN and Kontoinhaber", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "lisa@example.com",
      noPaypal: true,
      iban: "DE89370400440532013000",
      kontoinhaber: "Lisa Schmidt",
    });
    expect(result.success).toBe(true);
  });

  it("rejects noPaypal=true without IBAN", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "lisa@example.com",
      noPaypal: true,
      iban: "",
      kontoinhaber: "Lisa Schmidt",
    });
    expect(result.success).toBe(false);
  });

  it("rejects noPaypal=true without Kontoinhaber", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "lisa@example.com",
      noPaypal: true,
      iban: "DE89370400440532013000",
      kontoinhaber: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid IBAN format", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "lisa@example.com",
      noPaypal: true,
      iban: "INVALID",
      kontoinhaber: "Lisa Schmidt",
    });
    expect(result.success).toBe(false);
  });
});
