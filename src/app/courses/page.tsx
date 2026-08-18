import Link from "next/link";
import { modules } from "@/data/modules";

function levelFromOrder(order: number): { label: string; color: string } {
  if (order <= 5) return { label: "বিগিনার", color: "#5CCFE6" };
  if (order <= 11) return { label: "ইন্টারমিডিয়েট", color: "#FFB454" };
  return { label: "অ্যাডভান্সড", color: "#FF6B6B" };
}

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-mono text-2xl font-bold text-[var(--text)]">
        📚 কারিকুলাম — {modules.length}টি মডিউল
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        প্রতিটি কার্ডে ক্লিক করুন — পাঠ · কমান্ড · লাইভ প্র্যাকটিস · পরীক্ষা একসাথে।
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, idx) => {
          const lvl = levelFromOrder(mod.order);
          return (
            <Link
              key={mod.id}
              href={`/modules/${mod.id}`}
              className="block rounded-[14px] border border-[var(--border)] bg-[var(--panel)] p-[18px] no-underline transition hover:border-[var(--cyan)] hover:translate-y-[-2px]"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-2xl">{mod.icon}</span>
                <span
                  className="lvl-pill"
                  style={{ ["--lvl-color" as string]: lvl.color }}
                >
                  {lvl.label}
                </span>
              </div>
              <div className="font-mono text-[11px] text-[var(--muted)]">
                মডিউল {String(idx + 1).padStart(2, "0")}
              </div>
              <h2 className="mt-1 font-mono text-[15.5px] font-bold text-[var(--text)]">
                {mod.title}
              </h2>
              <p className="mt-1 min-h-[40px] text-[13px] leading-relaxed text-[var(--muted)]">
                {mod.description}
              </p>
              <p className="mt-2 text-xs text-[var(--green)]">
                {mod.lessons.length} লেসন · {mod.totalPoints} পয়েন্ট
              </p>
              <p className="mt-3 text-[13px] font-semibold text-[var(--cyan)]">
                খুলুন → পাঠ / টার্মিনাল / কুইজ
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
