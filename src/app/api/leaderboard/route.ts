import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/services/progress";
import { getLevel } from "@/lib/utils";

export async function GET() {
  try {
    const users = await getLeaderboard(50);
    const board = users.map((u, i) => ({
      rank: i + 1,
      id: u.id,
      name: u.name,
      points: u.totalPoints,
      level: getLevel(u.totalPoints).title,
      image: u.image,
    }));
    return NextResponse.json({ leaderboard: board });
  } catch (e) {
    console.error("[LEADERBOARD]", e);
    return NextResponse.json({ error: "সার্ভার এরর" }, { status: 500 });
  }
}
