"use client";

import React from "react";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const cn = [
    "rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm fade-in",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={cn} {...props} />;
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const cn = ["p-4 border-b border-slate-200/70 slide-up", className]
    .filter(Boolean)
    .join(" ");
  return <div className={cn} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const cn = ["text-lg font-semibold tracking-tight", className]
    .filter(Boolean)
    .join(" ");
  return <h3 className={cn} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const cn = ["p-4", className].filter(Boolean).join(" ");
  return <div className={cn} {...props} />;
}

export default Card;
