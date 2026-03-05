import { describe, it, expect } from "vitest";
import { referralSchema } from "../../types";

describe("referralSchema", () => {
  it("accepts valid name and email", () => {
    const result = referralSchema.safeParse({
      name: "Lisa Schmidt",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("accepts names with umlauts and special characters", () => {
    const result = referralSchema.safeParse({
      name: "Müller-Straße Öztürk",
      email: "test@test.de",
    });
    expect(result.success).toBe(true);
  });

  it("accepts names with accented characters", () => {
    const result = referralSchema.safeParse({
      name: "René Bélanger",
      email: "test@test.de",
    });
    expect(result.success).toBe(true);
  });

  it("rejects names with numbers", () => {
    const result = referralSchema.safeParse({
      name: "Lisa123",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects names with special symbols", () => {
    const result = referralSchema.safeParse({
      name: "Lisa@Schmidt",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects names exceeding 80 characters", () => {
    const result = referralSchema.safeParse({
      name: "A".repeat(81),
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = referralSchema.safeParse({
      name: "",
      email: "lisa@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects email exceeding 120 characters", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "a".repeat(110) + "@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = referralSchema.safeParse({
      name: "Lisa",
      email: "",
    });
    expect(result.success).toBe(false);
  });
});
