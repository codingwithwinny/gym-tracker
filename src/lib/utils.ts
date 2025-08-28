import type { Entry } from "@/lib/types";

export const STORAGE_KEY = "hybrid-progress-tracker-v2" as const;

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const uid = () =>
  typeof crypto !== "undefined" && (crypto as Crypto).randomUUID
    ? (crypto as Crypto).randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function epley1RM(weight: number, reps: number) {
  if (!weight || !reps) return 0;
  return Math.round(weight * (1 + reps / 30));
}

export function formatINRDate(dateStr: string) {
  try {
    const d = new Date(dateStr + "T00:00:00+05:30");
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

export function groupByWeek(entries: Entry[]) {
  const byWeek: Record<string, Entry[]> = {};
  entries.forEach((e: Entry) => {
    const d = new Date(e.date + "T00:00:00+05:30");
    const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = tmp.getUTCDay() || 7;
    tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
    const isoYear = tmp.getUTCFullYear();
    const yearStart = new Date(Date.UTC(isoYear, 0, 1));
    const diffMs = tmp.getTime() - yearStart.getTime();
    const weekNo = Math.ceil((diffMs / 86400000 + 1) / 7);
    const key = `${isoYear}-W${String(weekNo).padStart(2, "0")}`;
    byWeek[key] = byWeek[key] || [];
    byWeek[key].push(e);
  });
  return Object.entries(byWeek).map(([week, arr]) => ({
    week,
    totalVolume: (arr as Entry[]).reduce(
      (s: number, x: Entry) => s + (x.volume || x.weight * x.reps * x.sets),
      0
    ),
  }));
}

export function download(
  filename: string,
  dataStr: string,
  type = "application/json;charset=utf-8"
) {
  const blob = new Blob([dataStr], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const defaultExercises: string[] = [
  "Back Squat",
  "Front Squat",
  "High-Bar Squat",
  "Low-Bar Squat",
  "Paused Squat",
  "Box Squat",
  "Romanian Deadlift",
  "Conventional Deadlift",
  "Sumo Deadlift",
  "Trap Bar Deadlift",
  "Bulgarian Split Squat",
  "Leg Press",
  "Hack Squat",
  "Pendulum Squat",
  "Walking Lunge",
  "Reverse Lunge",
  "Leg Extension",
  "Leg Curl",
  "Standing Calf Raise",
  "Seated Calf Raise",
  "Tibialis Raise",
  "Barbell Bench Press",
  "Incline Bench Press",
  "Close-Grip Bench",
  "Dumbbell Bench Press",
  "Dumbbell Incline Press",
  "Weighted Dips",
  "Push-Up",
  "Overhead Press",
  "Seated Dumbbell Press",
  "Arnold Press",
  "Landmine Press",
  "Lateral Raise",
  "Cable Lateral Raise",
  "Machine Lateral Raise",
  "Rear Delt Fly",
  "Face Pull",
  "Triceps Pushdown",
  "Overhead Triceps Extension",
  "Skull Crusher",
  "Cable Triceps Extension",
  "Pull-Up",
  "Chin-Up",
  "Lat Pulldown",
  "Barbell Row",
  "Dumbbell Row",
  "Chest-Supported Row",
  "T-Bar Row",
  "Cable Row",
  "Face Pull (Back)",
  "Rear Delt Row",
  "Shrug",
  "Cable Pullover",
  "Hanging Leg Raise",
  "Captain's Chair Raise",
  "Ab Wheel Rollout",
  "Cable Crunch",
  "Weighted Plank",
  "Pallof Press",
  "Back Extension",
  "Bike Erg",
  "Row Erg",
  "Ski Erg",
  "Treadmill Incline Walk",
];

export const muscleGroups: string[] = [
  "Legs",
  "Shoulders",
  "Chest",
  "Back",
  "Biceps",
  "Triceps",
  "Core",
  "Full Body",
];
