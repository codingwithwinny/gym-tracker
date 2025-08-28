"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-[0.5px]";
  const variants: Record<string, string> = {
    default:
      "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900",
    secondary:
      "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400",
    destructive:
      "bg-rose-600 text-white hover:bg-rose-500 focus-visible:ring-rose-500",
  };
  const sizes: Record<string, string> = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    lg: "h-11 px-5 text-[15px]",
  };
  const cn = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
  return <button className={cn + " transition-transform hover:translate-y-[-1px]"} {...props} />;
}

export default Button;
