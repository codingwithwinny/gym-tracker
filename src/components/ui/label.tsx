"use client";

import React from "react";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const cn = ["mb-1 block text-sm font-medium text-slate-700", className]
    .filter(Boolean)
    .join(" ");
  return <label className={cn} {...props} />;
}

export default Label;
