"use client";

import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const cn = [
    "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-800",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <input ref={ref} className={cn} {...props} />;
});
Input.displayName = "Input";

export default Input;
