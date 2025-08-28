"use client";

import { useEffect } from "react";
import { epley1RM, groupByWeek, uid } from "@/lib/utils";
import type { Entry } from "@/lib/types";

export default function DevTests() {
  useEffect(() => {
    try {
      console.group("DevTests");
      console.assert(epley1RM(100, 5) === 117, "epley1RM(100,5) should be 117");
      console.assert(
        epley1RM(0, 10) === 0,
        "epley1RM with 0 weight should be 0"
      );

      const sample: Entry[] = [
        {
          id: "a",
          exercise: "Test",
          muscle: "Legs",
          notes: "",
          date: "2023-12-31",
          weight: 10,
          reps: 10,
          sets: 1,
        },
        {
          id: "b",
          exercise: "Test",
          muscle: "Legs",
          notes: "",
          date: "2024-01-01",
          weight: 10,
          reps: 10,
          sets: 1,
        },
      ];
      const weeks = groupByWeek(sample);
      console.assert(
        weeks.every((w) => /\d{4}-W\d{2}/.test(w.week)),
        "groupByWeek week label format"
      );

      const ids = new Set(Array.from({ length: 50 }, () => uid()));
      console.assert(ids.size === 50, "uid should generate unique IDs");
    } catch {
      console.error("DevTests encountered an error");
    } finally {
      console.groupEnd();
    }
  }, []);
  return null;
}
