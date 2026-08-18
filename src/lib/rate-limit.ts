/**
 * Production-ready rate limiter.
 * - Development / single-instance: in-memory sliding window
 * - Production multi-instance: replace with Upstash Redis (see comments)
 *
 * Usage:
 *   const limited = rateLimit(`login:${ip}`, { limit: 10, windowMs: 60_000 });
 *   if (!limited.success) return 429;
 */

type Bucket = { timestamps: number[] };

const store = new Map<string, Bucket>();

export type RateLimitOptions = {
  /** Max requests in the window */
  limit: number;
  /** Window size in ms */
  windowMs: number;
};

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfterMs: number;
};

export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowStart = now - opts.windowMs;

  let bucket = store.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    store.set(key, bucket);
  }

  // Drop expired
  bucket.timestamps = bucket.timestamps.filter((t) => t > windowStart);

  if (bucket.timestamps.length >= opts.limit) {
    const oldest = bucket.timestamps[0] ?? now;
    return {
      success: false,
      remaining: 0,
      retryAfterMs: Math.max(0, oldest + opts.windowMs - now),
    };
  }

  bucket.timestamps.push(now);
  return {
    success: true,
    remaining: opts.limit - bucket.timestamps.length,
    retryAfterMs: 0,
  };
}

/** Extract client IP from standard proxy headers */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

/**
 * Production (multi-instance) example with Upstash:
 *
 * import { Ratelimit } from "@upstash/ratelimit";
 * import { Redis } from "@upstash/redis";
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(10, "1 m"),
 * });
 * const { success } = await ratelimit.limit(ip);
 */
