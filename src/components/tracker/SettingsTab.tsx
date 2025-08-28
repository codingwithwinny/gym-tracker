"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { DataModel } from "@/lib/types";
import { download, todayISO } from "@/lib/utils";

export default function SettingsTab({ data, setData }: { data: DataModel; setData: React.Dispatch<React.SetStateAction<DataModel>> }) {
  const exportCSV = () => {
    const header = ["id", "date", "exercise", "muscle", "weight", "reps", "sets", "rpe", "rir", "volume", "notes"] as const;
    const esc = (v: unknown) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
    const rows = data.entries.map((e) => header.map((h) => esc((e as Record<string, unknown>)[h])));
    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    download(`entries-${todayISO()}.csv`, csv, "text/csv;charset=utf-8");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Units & Intensity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Units</div>
              <div className="text-sm text-slate-500">Currently kg (metric)</div>
            </div>
            <Button variant="secondary" disabled>kg</Button>
          </div>
          <div>
            <Label>Intensity Scale</Label>
            <Select
              value={data.settings.intensityScale}
              onValueChange={(v) =>
                setData({ ...data, settings: { ...data.settings, intensityScale: v as "RPE" | "RIR" } })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RPE">RPE (0–10)</SelectItem>
                <SelectItem value="RIR">RIR (reps in reserve)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backup / Restore</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Placeholder – page still renders the shared component */}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={exportCSV}>Export CSV (Entries)</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Cloud Backup (Future)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600">
            This app is ready for an online backup later. Toggle the option below and set an endpoint when you have a server.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={data.settings.cloud.enabled}
                onCheckedChange={(v) =>
                  setData({ ...data, settings: { ...data.settings, cloud: { ...data.settings.cloud, enabled: Boolean(v) } } })
                }
              />
              <span className="text-sm">Enable Cloud Backup (scaffold)</span>
            </div>
            <div className="md:col-span-2">
              <Label>API Endpoint (POST)</Label>
              <Input
                placeholder="https://your-api.example.com/backup"
                value={data.settings.cloud.endpoint}
                onChange={(e) =>
                  setData({ ...data, settings: { ...data.settings, cloud: { ...data.settings.cloud, endpoint: e.target.value } } })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


