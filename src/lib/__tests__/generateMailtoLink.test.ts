import { describe, it, expect } from "vitest";
import { generateMailtoLink } from "../generateMailtoLink";

const sampleData = {
  name: "Lisa Schmidt",
  email: "lisa@example.com",
  refCode: "#SEE-2026-1234",
};

describe("generateMailtoLink", () => {
  it("starts with mailto: and has no recipient", () => {
    const link = generateMailtoLink(sampleData);
    expect(link).toMatch(/^mailto:\?/);
  });

  it("includes the encoded subject", () => {
    const link = generateMailtoLink(sampleData);
    expect(link).toContain(
      "subject=" + encodeURIComponent("Empfehlung – Seehafer Elemente")
    );
  });

  it("includes the name in the body", () => {
    const link = generateMailtoLink(sampleData);
    expect(link).toContain(encodeURIComponent("Lisa Schmidt"));
  });

  it("includes the email in the body", () => {
    const link = generateMailtoLink(sampleData);
    expect(link).toContain(encodeURIComponent("lisa@example.com"));
  });

  it("includes the ref code in the body", () => {
    const link = generateMailtoLink(sampleData);
    expect(link).toContain(encodeURIComponent("#SEE-2026-1234"));
  });

  it("properly URL-encodes special characters", () => {
    const link = generateMailtoLink({
      name: "Müller-Öß",
      email: "test@test.de",
      refCode: "#SEE-2026-0001",
    });
    // Should not contain raw spaces or special chars outside encoding
    expect(link).not.toContain(" ");
    expect(link).toContain(encodeURIComponent("Müller-Öß"));
  });
});
