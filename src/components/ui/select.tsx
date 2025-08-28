"use client";

import React from "react";

type Option = { value: string; label?: string };

type SelectRootProps = {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
};

const SelectContext = React.createContext<{
  value: string;
  onValueChange: (v: string) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
} | null>(null);

export function Select({ value, onValueChange, children }: SelectRootProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  return (
    <button
      type="button"
      className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-left text-sm"
      onClick={() => ctx.setOpen(!ctx.open)}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  return <span className="text-slate-700">{ctx.value || placeholder}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx || !ctx.open) return null;
  return (
    <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-300 bg-white shadow-lg scale-in">
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  return (
    <div
      className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer"
      onClick={() => {
        ctx.onValueChange(value);
        ctx.setOpen(false);
      }}
    >
      {children}
    </div>
  );
}

export default Select;
