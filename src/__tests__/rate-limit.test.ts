import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `test-allow-${Date.now()}`;
    const r1 = rateLimit(key, { limit: 3, windowMs: 60_000 });
    const r2 = rateLimit(key, { limit: 3, windowMs: 60_000 });
    expect(r1.success).toBe(true);
    expect(r2.success).toBe(true);
    expect(r2.remaining).toBe(1);
  });

  it("blocks when limit exceeded", () => {
    const key = `test-block-${Date.now()}`;
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    const blocked = rateLimit(key, { limit: 2, windowMs: 60_000 });
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });
});
