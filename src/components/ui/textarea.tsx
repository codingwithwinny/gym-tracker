"use client";

import React from "react";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const cn = [
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-800",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <textarea ref={ref} className={cn} {...props} />;
});
Textarea.displayName = "Textarea";

export default Textarea;
