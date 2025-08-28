"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Plus, Trash2 } from "lucide-react";
import type { DataModel, Plan, PlanWeek } from "@/lib/types";

export default function PlanTab({
  data,
  setData,
}: {
  data: DataModel;
  setData: (d: DataModel) => void;
}) {
  const blank: Plan = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    month: new Date().toISOString().slice(0, 7),
    title: "Mesocycle",
    goal: "e.g., Build legs, bring up shoulders, maintain abs",
    template: "PPL",
    guidanceAccepted: true,
    weekly: [
      {
        week: 1,
        focus: "Intro Volume",
        targetLoads: "+0 kg",
        keyNotes: "Keep RPE 6-7",
      },
      {
        week: 2,
        focus: "Progress",
        targetLoads: "+2.5 kg or +1 rep",
        keyNotes: "RPE 7-8",
      },
      {
        week: 3,
        focus: "Peak Volume",
        targetLoads: "+2.5 kg or +1-2 reps",
        keyNotes: "RPE 8",
      },
      {
        week: 4,
        focus: "Deload",
        targetLoads: "-30-50% volume",
        keyNotes: "RPE 5-6",
      },
    ],
  };
  const [form, setForm] = useState<Plan>(blank);

  const addPlan = () => {
    if (!form.month || !form.title) return;
    setData({ ...data, plan: [form, ...data.plan] });
    setForm({
      ...blank,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    });
  };

  const delPlan = (id: string) =>
    setData({ ...data, plan: data.plan.filter((p) => p.id !== id) });
  const makeTemplate = (type: string) => {
    const base = { ...form, template: type };
    if (type === "PPL") {
      base.weekly = [
        {
          week: 1,
          focus: "Intro",
          targetLoads: "Find working weights",
          keyNotes: "8–12 sets/key lift, RPE 6-7",
        },
        {
          week: 2,
          focus: "Build",
          targetLoads: "+2.5kg or +1 rep",
          keyNotes: "10–14 sets, RPE 7-8",
        },
        {
          week: 3,
          focus: "Peak",
          targetLoads: "+2.5kg or +1 rep",
          keyNotes: "12–16 sets, RPE 8",
        },
        {
          week: 4,
          focus: "Deload",
          targetLoads: "-30–50% volume",
          keyNotes: "6–8 sets, RPE 5-6",
        },
      ];
    }
    setForm(base);
  };

  function updateWeek(index: number, next: PlanWeek) {
    setForm((f) => ({
      ...f,
      weekly: f.weekly.map((m, i) => (i === index ? next : m)),
    }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Create Monthly Plan</CardTitle>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Info className="h-4 w-4" /> Guide below
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Month</Label>
              <Input
                type="month"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label>Goal</Label>
              <Input
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                placeholder="e.g., Squat +10kg, OHP +2.5kg, visible abs"
              />
            </div>
            <div>
              <Label>Template</Label>
              <Select
                value={form.template}
                onValueChange={(v) => setForm({ ...form, template: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PPL">Push–Pull–Legs</SelectItem>
                  <SelectItem value="UL">Upper/Lower</SelectItem>
                  <SelectItem value="FB">Full Body</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={() => makeTemplate(form.template)}
              >
                Apply Template
              </Button>
            </div>
            <div className="col-span-2">
              <Label>Notes / Targets</Label>
              <Textarea
                rows={3}
                value={form.notes || ""}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Key lifts, rep ranges, deload rules, cardio limits, etc."
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Weekly Targets</h4>
              <Button
                size="sm"
                onClick={() =>
                  setForm({
                    ...form,
                    weekly: [
                      ...form.weekly,
                      {
                        week: form.weekly.length + 1,
                        focus: "",
                        targetLoads: "",
                        keyNotes: "",
                      },
                    ],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Week
              </Button>
            </div>
            <div className="space-y-2">
              {form.weekly.map((mc, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 p-2 rounded-xl border"
                >
                  <div className="col-span-2">
                    <Label>Week</Label>
                    <Input
                      type="number"
                      value={mc.week}
                      onChange={(e) =>
                        updateWeek(idx, { ...mc, week: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Label>Focus</Label>
                    <Input
                      value={mc.focus}
                      onChange={(e) =>
                        updateWeek(idx, { ...mc, focus: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Label>Load/Rep Target</Label>
                    <Input
                      value={mc.targetLoads}
                      onChange={(e) =>
                        updateWeek(idx, { ...mc, targetLoads: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Label>Notes</Label>
                    <Input
                      value={mc.keyNotes}
                      onChange={(e) =>
                        updateWeek(idx, { ...mc, keyNotes: e.target.value })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={addPlan}>
              <Plus className="mr-2 h-4 w-4" />
              Save Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Saved Plans</CardTitle>
          <PlanGuide />
        </CardHeader>
        <CardContent>
          {data.plan.length === 0 ? (
            <p className="text-sm text-slate-500">
              No monthly plans yet. Use the guide to create one.
            </p>
          ) : (
            <div className="space-y-3">
              {data.plan.map((p) => (
                <div key={p.id} className="rounded-2xl border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {p.title} —{" "}
                        <span className="text-slate-500">{p.month}</span>
                      </h4>
                      <p className="text-sm text-slate-600">Goal: {p.goal}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => delPlan(p.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                  <p className="mt-2 text-sm">{p.notes}</p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {p.weekly.map((mc) => (
                      <div key={mc.week} className="rounded-xl border p-2">
                        <div className="text-xs text-slate-500">
                          Week {mc.week}
                        </div>
                        <div className="text-sm">
                          Focus: <strong>{mc.focus || "-"}</strong>
                        </div>
                        <div className="text-sm">
                          Target: <strong>{mc.targetLoads || "-"}</strong>
                        </div>
                        <div className="text-xs text-slate-600">
                          {mc.keyNotes || ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PlanGuide() {
  return (
    <div className="inline-flex items-center gap-2 text-xs bg-slate-50 border rounded-xl px-3 py-1">
      <Info className="h-3.5 w-3.5" />
      <span>
        <strong>How to use:</strong> 1) Pick a goal. 2) Choose a template
        (PPL/UL/FB). 3) Set week-by-week focus and small load/rep bumps. 4) Week
        4 deload (–30–50% volume). 5) Track lifts in Log and aim to hit the
        weekly targets.
      </span>
    </div>
  );
}
