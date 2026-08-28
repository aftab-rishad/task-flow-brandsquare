import { cn } from "@/lib/utils";
import React from "react";

interface OverviewCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "destructive" | "success" | "default";
}

function OverviewCard({
  title,
  icon,
  children,
  variant = "default",
}: OverviewCardProps) {
  return (
    <div className="w-full bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold">{title}</h2>
        <span
          className={cn(
            variant === "destructive"
              ? "bg-destructive/10 text-destructive"
              : variant === "success"
                ? "bg-green-600/10 text-green-600"
                : "bg-primary/10 text-primary",
            "rounded-full p-2",
          )}
        >
          {icon}
        </span>
      </div>
      <h1
        className={cn(
          variant === "destructive"
            ? "text-destructive"
            : variant === "success"
              ? "text-green-600"
              : "text-primary",
          "text-4xl font-bold",
        )}
      >
        {children}
      </h1>
    </div>
  );
}

export default OverviewCard;
