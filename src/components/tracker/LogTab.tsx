"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { Edit3, Plus, Save, Search, Trash2, X } from "lucide-react";
import type { DataModel, Entry } from "@/lib/types";
import { epley1RM, formatINRDate, muscleGroups } from "@/lib/utils";

export default function LogTab({
  data,
  setData,
}: {
  data: DataModel;
  setData: React.Dispatch<React.SetStateAction<DataModel>>;
}) {
  const allExercises = useMemo(
    () =>
      Array.from(
        new Set([
          ...(data.exercises?.default || []),
          ...(data.exercises?.custom || []).map((e) => e.name),
        ])
      ).sort(),
    [data.exercises]
  );

  const blank: Entry = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    date: new Date().toISOString().slice(0, 10),
    exercise: allExercises[0] || "Back Squat",
    muscle: "Legs",
    weight: 60,
    reps: 8,
    sets: 4,
    rpe: "",
    rir: "",
    volume: 60 * 8 * 4,
    notes: "",
  };
  const [form, setForm] = useState<Entry>(blank);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    setForm((f) => ({
      ...f,
      volume: Number(f.weight || 0) * Number(f.reps || 0) * Number(f.sets || 0),
    }));
  }, [form.weight, form.reps, form.sets]);

  useEffect(() => {
    if (!allExercises.includes(form.exercise) && allExercises.length) {
      setForm((f) => ({ ...f, exercise: allExercises[0] }));
    }
  }, [allExercises, form.exercise]);

  const addEntry = () => {
    if (!form.date || !form.exercise) return;
    setData({ ...data, entries: [form, ...data.entries] });
    setForm({
      ...blank,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    });
  };

  const startEdit = (id: string) => {
    const entry = data.entries.find((e) => e.id === id);
    if (entry) {
      setEditing(id);
      setForm(entry);
    }
  };

  const saveEdit = () => {
    setData({
      ...data,
      entries: data.entries.map((e) => (e.id === editing ? form : e)),
    });
    setEditing(null);
    setForm({
      ...blank,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({
      ...blank,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    });
  };
  const del = (id: string) =>
    setData({ ...data, entries: data.entries.filter((e) => e.id !== id) });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.entries.filter(
      (e) =>
        e.exercise.toLowerCase().includes(q) ||
        e.muscle.toLowerCase().includes(q) ||
        e.notes.toLowerCase().includes(q)
    );
  }, [data.entries, query]);

  const totalThisMonth = useMemo(() => {
    const now = new Date();
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    return data.entries
      .filter((e) => e.date.startsWith(ym))
      .reduce((s, e) => s + (e.volume || e.weight * e.reps * e.sets), 0);
  }, [data.entries]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>{editing ? "Edit Entry" : "Add New Entry"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <Label>Exercise</Label>
              <Select
                value={form.exercise}
                onValueChange={(v) => setForm({ ...form, exercise: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select exercise" />
                </SelectTrigger>
                <SelectContent>
                  {allExercises.map((ex) => (
                    <SelectItem key={ex} value={ex}>
                      {ex}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Muscle Group</Label>
              <Select
                value={form.muscle}
                onValueChange={(v) => setForm({ ...form, muscle: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select muscle" />
                </SelectTrigger>
                <SelectContent>
                  {muscleGroups.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                value={form.weight}
                onChange={(e) =>
                  setForm({ ...form, weight: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label>Reps</Label>
              <Input
                type="number"
                value={form.reps}
                onChange={(e) =>
                  setForm({ ...form, reps: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label>Sets</Label>
              <Input
                type="number"
                value={form.sets}
                onChange={(e) =>
                  setForm({ ...form, sets: Number(e.target.value) })
                }
              />
            </div>
            <div className="col-span-2">
              <Label>Notes</Label>
              <Textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-3 items-end">
              <div>
                <Label>Volume (auto)</Label>
                <Input value={form.volume} readOnly />
              </div>
              <div className="flex gap-2 justify-end">
                {editing ? (
                  <>
                    <Button onClick={saveEdit}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="secondary" onClick={cancelEdit}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={addEntry}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Training Log</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                className="pl-8"
                placeholder="Search exercise, muscle, notes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <span className="text-sm text-slate-500">
              This month volume: <strong>{totalThisMonth}</strong>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Exercise</th>
                  <th className="p-2">Muscle</th>
                  <th className="p-2">Weight</th>
                  <th className="p-2">Reps</th>
                  <th className="p-2">Sets</th>
                  <th className="p-2">Volume</th>
                  <th className="p-2">1RM Est.</th>
                  <th className="p-2">Intensity</th>
                  <th className="p-2">Notes</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td className="p-4 text-slate-400" colSpan={11}>
                      No entries yet. Add your first set on the left.
                    </td>
                  </tr>
                )}
                {filtered.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="p-2 whitespace-nowrap">
                      {formatINRDate(e.date)}
                    </td>
                    <td className="p-2">{e.exercise}</td>
                    <td className="p-2">{e.muscle}</td>
                    <td className="p-2">{e.weight}</td>
                    <td className="p-2">{e.reps}</td>
                    <td className="p-2">{e.sets}</td>
                    <td className="p-2">
                      {e.volume || e.weight * e.reps * e.sets}
                    </td>
                    <td className="p-2">{epley1RM(e.weight, e.reps)}</td>
                    <td className="p-2">
                      {data.settings.intensityScale === "RPE"
                        ? e.rpe || "-"
                        : e.rir || "-"}
                    </td>
                    <td className="p-2 max-w-[16rem] truncate" title={e.notes}>
                      {e.notes}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => startEdit(e.id)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => del(e.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
