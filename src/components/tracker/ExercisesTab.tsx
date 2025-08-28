"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import type { DataModel } from "@/lib/types";
import { muscleGroups } from "@/lib/utils";

export default function ExercisesTab({ data, setData }: { data: DataModel; setData: (d: DataModel) => void }) {
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("Legs");

  const add = () => {
    if (!name.trim()) return;
    const exists =
      (data.exercises.custom || []).some((e) => e.name.toLowerCase() === name.trim().toLowerCase()) ||
      (data.exercises.default || []).some((e) => e.toLowerCase() === name.trim().toLowerCase());
    if (exists) return alert("Exercise already exists");
    setData({
      ...data,
      exercises: { ...data.exercises, custom: [{ name: name.trim(), muscle }, ...(data.exercises.custom || [])] },
    });
    setName("");
  };

  const del = (idx: number) => {
    const next = [...(data.exercises.custom || [])];
    next.splice(idx, 1);
    setData({ ...data, exercises: { ...data.exercises, custom: next } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Custom Exercise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label>Exercise Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Cossack Squat" />
            </div>
            <div className="col-span-2">
              <Label>Muscle Group</Label>
              <Select value={muscle} onValueChange={setMuscle}>
                <SelectTrigger>
                  <SelectValue />
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
          </div>
          <div className="flex justify-end">
            <Button onClick={add}>
              Add Exercise
            </Button>
          </div>
          <p className="text-xs text-slate-500">Tip: Keep names simple so you can search them quickly in the Log.</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Your Custom Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          {(data.exercises.custom || []).length === 0 ? (
            <p className="text-sm text-slate-500">No custom exercises yet.</p>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-slate-500">
                  <tr>
                    <th className="p-2">Exercise</th>
                    <th className="p-2">Muscle</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.exercises.custom.map((e, idx) => (
                    <tr key={e.name + idx} className="border-t">
                      <td className="p-2">{e.name}</td>
                      <td className="p-2">{e.muscle}</td>
                      <td className="p-2">
                        <Button size="sm" variant="destructive" onClick={() => del(idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


