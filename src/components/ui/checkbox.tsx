"use client";

import React from "react";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> & {
  onCheckedChange?: (checked: boolean) => void;
};

export function Checkbox({
  className,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const cn = [
    "h-4 w-4 rounded border border-slate-300 text-indigo-600 focus:ring-indigo-400",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <input
      type="checkbox"
      className={cn}
      onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
      {...props}
    />
  );
}

export default Checkbox;
