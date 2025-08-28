"use client";

import React, { useEffect, useState } from "react";
import LogTab from "@/components/tracker/LogTab";
import PlanTab from "@/components/tracker/PlanTab";
import AnalyticsTab from "@/components/tracker/AnalyticsTab";
import ExercisesTab from "@/components/tracker/ExercisesTab";
import SettingsTab from "@/components/tracker/SettingsTab";
import BackupRestore from "@/components/tracker/BackupRestore";
import DevTests from "@/components/tracker/DevTests";
import AuthGate from "@/components/tracker/AuthGate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DataModel } from "@/lib/types";
import { STORAGE_KEY, defaultExercises } from "@/lib/utils";
import { Settings, BarChart3, Calendar, Database } from "lucide-react";

// -------------------- Main App --------------------

export default function App() {
  const [data, setData] = useState<DataModel>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const base: DataModel = {
        entries: [],
        plan: [],
        exercises: { default: defaultExercises, custom: [] },
        settings: {
          units: "kg",
          intensityScale: "RPE",
          cloud: { enabled: false, endpoint: "" },
        },
      };
      if (!saved) return base;
      const parsed = JSON.parse(saved) as Partial<DataModel>;
      return {
        ...base,
        ...parsed,
        exercises: (parsed as DataModel).exercises || base.exercises,
        settings: {
          ...base.settings,
          ...((parsed as DataModel).settings || {}),
          cloud: {
            ...base.settings.cloud,
            ...((parsed as DataModel).settings?.cloud || {}),
          },
        },
      };
    } catch (e) {
      console.warn("Failed to load saved data, resetting…", e);
      return {
        entries: [],
        plan: [],
        exercises: { default: defaultExercises, custom: [] },
        settings: {
          units: "kg",
          intensityScale: "RPE",
          cloud: { enabled: false, endpoint: "" },
        },
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const [tab, setTab] = useState("log");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-3 sm:p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Universal Gym Progress Tracker
          </h1>
          <div className="flex gap-2 items-center">
            <AuthGate />
            <BackupRestore data={data} setData={setData} />
          </div>
        </header>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="log">
              <BarChart3 className="mr-2 h-4 w-4" />
              Log
            </TabsTrigger>
            <TabsTrigger value="plan">
              <Calendar className="mr-2 h-4 w-4" />
              Monthly Plan
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="exercises">
              <Database className="mr-2 h-4 w-4" />
              Exercises
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="log">
            <LogTab data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="plan">
            <PlanTab data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab data={data} />
          </TabsContent>
          <TabsContent value="exercises">
            <ExercisesTab data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab data={data} setData={setData} />
          </TabsContent>
        </Tabs>

        <footer className="text-center text-xs text-slate-500">
          Data is saved locally in your browser. Cloud backup option is
          scaffolded for future use.
        </footer>
      </div>
      <DevTests />
    </div>
  );
}
