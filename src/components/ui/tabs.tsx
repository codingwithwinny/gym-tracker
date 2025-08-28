"use client";

import React from "react";

type TabsContextValue = {
  value: string;
  onValueChange: (v: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  value,
  onValueChange,
  className,
  children,
}: {
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const cn = [
    "inline-grid gap-2 rounded-xl bg-slate-100 p-1 border border-slate-200 overflow-x-auto whitespace-nowrap",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={cn} {...props} />;
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  const isActive = ctx.value === value;
  const cn = [
    "px-3 py-2 text-sm rounded-lg text-center transition-colors min-w-[88px]",
    isActive
      ? "bg-white shadow text-slate-900"
      : "text-slate-600 hover:text-slate-800",
  ].join(" ");
  return (
    <button
      className={cn + " hover:scale-[1.02] transition-transform"}
      onClick={() => ctx.onValueChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx || ctx.value !== value) return null;
  return <div className="mt-3">{children}</div>;
}

export default Tabs;
