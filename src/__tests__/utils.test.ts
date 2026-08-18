import { describe, it, expect } from "vitest";
import { getLevel, formatPoints, cn } from "@/lib/utils";

describe("getLevel", () => {
  it("returns নবীন for low points", () => {
    const result = getLevel(50);
    expect(result.level).toBe(1);
    expect(result.title).toBe("নবীন");
  });

  it("returns হিরো for high points", () => {
    const result = getLevel(2000);
    expect(result.level).toBe(6);
    expect(result.title).toBe("হিরো");
  });
});

describe("formatPoints", () => {
  it("formats numbers", () => {
    expect(formatPoints(1000)).toBeTruthy();
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toContain("px-2");
  });
});
