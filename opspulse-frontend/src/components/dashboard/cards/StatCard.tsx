"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppWindow, Monitor, Users } from "lucide-react";

const ICONS: Record<string, any> = {
  users: Users,
  devices: Monitor,
  apps: AppWindow,
};

export default function StatCard({
  title,
  value,
  subtext,
  icon,
  loading,
  height = "h-[210px]",
  compact = false,
}: {
  title: string;
  value: number | string;
  subtext: string;
  icon: "users" | "devices" | "apps";
  loading?: boolean;
  height?: string;
  compact?: boolean;
}) {
  const Icon = ICONS[icon];

  return (
    <Card className={`rounded-3xl border-zinc-200 bg-[#FAF8F3] shadow-sm ${height}`}>
      <CardContent className={`${compact ? "p-5" : "p-6"} h-full`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Icon className="h-4 w-4 text-zinc-600" />
            <span className="font-medium">{title}</span>
          </div>

          {!compact ? (
            <Badge className="rounded-full bg-white/60 text-zinc-700 border border-zinc-200">
              Live
            </Badge>
          ) : null}
        </div>

        <div className={`mt-4 font-semibold tabular-nums ${compact ? "text-4xl" : "text-5xl"}`}>
          {loading ? "…" : value}
        </div>

        <div className="mt-2 text-sm text-zinc-600">{loading ? "Loading…" : subtext}</div>
      </CardContent>
    </Card>
  );
}
