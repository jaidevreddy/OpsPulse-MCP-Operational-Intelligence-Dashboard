"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Monitor, AppWindow } from "lucide-react";

type SplitItem = {
  title: string;
  value: string | number;
  subtext: string;
  icon: "devices" | "apps";
};

const ICONS: Record<string, any> = {
  devices: Monitor,
  apps: AppWindow,
};

export default function SplitStatCard({
  left,
  right,
}: {
  left: SplitItem;
  right: SplitItem;
}) {
  const LeftIcon = ICONS[left.icon];
  const RightIcon = ICONS[right.icon];

  return (
    <Card className="rounded-3xl border-zinc-200 bg-[#FAF8F3] shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-2">
          {/* LEFT */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <LeftIcon className="h-4 w-4 text-zinc-600" />
              <span className="font-medium">{left.title}</span>
            </div>

            <div className="mt-4 text-5xl font-semibold tabular-nums">
              {left.value}
            </div>

            <div className="mt-2 text-sm text-zinc-600">{left.subtext}</div>
          </div>

          {/* RIGHT */}
          <div className="p-6 bg-black/[0.03]">
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <RightIcon className="h-4 w-4 text-zinc-600" />
              <span className="font-medium">{right.title}</span>
            </div>

            <div className="mt-4 text-5xl font-semibold tabular-nums">
              {right.value}
            </div>

            <div className="mt-2 text-sm text-zinc-600">{right.subtext}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
