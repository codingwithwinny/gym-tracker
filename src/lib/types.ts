export type Entry = {
  id: string;
  date: string;
  exercise: string;
  muscle: string;
  weight: number;
  reps: number;
  sets: number;
  rpe?: string | number;
  rir?: string | number;
  volume?: number;
  notes: string;
};

export type PlanWeek = {
  week: number;
  focus: string;
  targetLoads: string;
  keyNotes: string;
};

export type Plan = {
  id: string;
  month: string;
  title: string;
  goal: string;
  template: string;
  guidanceAccepted: boolean;
  weekly: PlanWeek[];
  notes?: string;
};

export type DataModel = {
  entries: Entry[];
  plan: Plan[];
  exercises: { default: string[]; custom: { name: string; muscle: string }[] };
  settings: {
    units: string;
    intensityScale: "RPE" | "RIR";
    cloud: { enabled: boolean; endpoint: string };
  };
};


