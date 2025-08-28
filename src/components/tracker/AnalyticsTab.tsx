"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DataModel } from "@/lib/types";
import { epley1RM, groupByWeek } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function AnalyticsTab({ data }: { data: DataModel }) {
  const weekly = useMemo(() => groupByWeek(data.entries), [data.entries]);

  const oneRmByExercise = useMemo(() => {
    const best: Record<string, number> = {};
    data.entries.forEach((e) => {
      const key = e.exercise;
      const est = epley1RM(e.weight, e.reps);
      best[key] = Math.max(best[key] || 0, est);
    });
    return Object.entries(best)
      .map(([exercise, oneRM]) => ({ exercise, oneRM }))
      .sort((a, b) => b.oneRM - a.oneRM)
      .slice(0, 12);
  }, [data.entries]);

  const volumeByMuscle = useMemo(() => {
    const map: Record<string, number> = {};
    data.entries.forEach((e) => {
      const vol = e.volume || e.weight * e.reps * e.sets;
      map[e.muscle] = (map[e.muscle] || 0) + vol;
    });
    return Object.entries(map)
      .map(([muscle, volume]) => ({ muscle, volume }))
      .sort((a, b) => b.volume - a.volume);
  }, [data.entries]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Weekly Total Volume</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalVolume" name="Total Volume" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Estimated 1RMs (Top 12)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={oneRmByExercise} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="exercise" type="category" width={160} />
              <Tooltip />
              <Legend />
              <Bar dataKey="oneRM" name="1RM (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Volume by Muscle Group</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeByMuscle}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="muscle" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="volume" name="Volume" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}


