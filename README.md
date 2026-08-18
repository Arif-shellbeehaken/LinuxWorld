# 🐧 Linux Zero to Hero

**সম্পূর্ণ বাংলায় লিনাক্স শেখার আধুনিক ওয়েব প্ল্যাটফর্ম**

শূন্য থেকে হিরো পর্যন্ত — স্টেপ-বাই-স্টেপ লেসন, হ্যান্ডস-অন প্র্যাকটিস, কুইজ/পরীক্ষা, পয়েন্ট সিস্টেম, লিডারবোর্ড, ব্যাজ/অ্যাওয়ার্ড — সব এক জায়গায়।

## ✨ Features

- 📚 **মডিউল ভিত্তিক লেসন** — সম্পূর্ণ বাংলায়
- 💻 **প্র্যাকটিস ল্যাব** — গাইডেড এক্সারসাইজ + হিন্ট
- 📝 **কুইজ ও পরীক্ষা** — অটো মার্কিং, স্কোর, পাসিং ক্রাইটেরিয়া
- 🎯 **পয়েন্ট ও লেভেল সিস্টেম** — নবীন → হিরো
- 🏆 **ব্যাজ / অ্যাওয়ার্ড**
- 📊 **ড্যাশবোর্ড ও লিডারবোর্ড**
- 🌙 **মডার্ন ক্লিন UI** (Tailwind CSS 4 + Dark mode ready)
- 📱 **রেসপন্সিভ** (মোবাইল ফ্রেন্ডলি)
- 💾 **লোকাল প্রোগ্রেস** (Zustand + localStorage)

## 🛠 Tech Stack (2026 Latest)

| Layer | Technology |
|-------|------------|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** |
| UI | **React 19** + **Tailwind CSS 4** |
| State | **Zustand** (persist) |
| Icons / Utils | lucide-react, clsx, tailwind-merge, cva |
| Testing | **Vitest** + Testing Library |
| Font | Noto Sans Bengali + Geist |

## 🏗 Architecture & Project Layout

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── courses/            # Module listing
│   ├── lessons/[id]/      # Individual lesson
│   ├── practice/           # Practice lab
│   ├── exam/               # Quiz system
│   ├── dashboard/          # User progress
│   ├── leaderboard/        # Ranking
│   └── profile/            # Profile
├── components/
│   ├── ui/                 # Reusable primitives (Button, Card...)
│   ├── layout/             # Navbar, Footer
│   ├── course/             # (extensible)
│   └── quiz/
├── data/                   # Content (modules, quizzes, exercises)
├── lib/                    # Utilities (cn, getLevel...)
├── store/                  # Zustand stores
├── types/                  # Shared TypeScript types
├── hooks/
└── __tests__/              # Unit tests
```

### Design Principles

- **Separation of Concerns**: Data, UI, State clearly separated
- **Type Safety**: Full TypeScript coverage
- **Component Composition**: Small reusable UI primitives
- **Client/Server balance**: Static content server-rendered, interactivity client-side
- **Progressive Enhancement**: Works without JS for content viewing

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
npm start

# Run unit tests
npm test

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000)

## 📈 Future Roadmap (Professional next steps)

1. **Backend**: Next.js API Routes + Prisma + PostgreSQL
2. **Auth**: Auth.js (NextAuth) — Google / GitHub / Email
3. **Real Leaderboard**: Server-side ranking
4. **Interactive Terminal**: Web-based Linux terminal (xterm.js + backend container)
5. **MDX Lessons**: Better content authoring
6. **CI/CD**: GitHub Actions + Vercel
7. **i18n**: Multi-language support
8. **PWA**: Offline support

## 🧪 Testing

Unit tests cover core utilities (`getLevel`, `cn`, etc.).

```bash
npm test
```

## 📄 License

MIT — শিক্ষার জন্য মুক্ত।

---

**Built with ❤️ for the Bangla-speaking Linux community.**
