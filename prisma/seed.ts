import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Demo1234", 12);

  const demo = await prisma.user.upsert({
    where: { email: "demo@linuxworld.dev" },
    update: {},
    create: {
      name: "ডেমো ইউজার",
      email: "demo@linuxworld.dev",
      passwordHash,
      totalPoints: 120,
      progress: {
        create: {
          completedLessons: JSON.stringify(["les-01-01", "les-01-02"]),
          badges: JSON.stringify(["badge-first-lesson", "badge-100-points"]),
        },
      },
    },
  });

  console.log("Seeded demo user:", demo.email, "/ password: Demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
