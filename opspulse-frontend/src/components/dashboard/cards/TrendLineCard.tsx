"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TrendLineCard({
  title,
  value,
  deltaText,
  points,
  loading,
}: {
  title: string;
  value: string;
  deltaText: string;
  points: Array<{ label: string; value: number }>;
  loading?: boolean;
}) {
  return (
    <Card className="rounded-3xl border-zinc-200 bg-[#FAF8F3] shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="text-sm font-medium text-zinc-700">{title}</div>
          <div className="text-xs text-zinc-500">
            {loading ? "Loading…" : "This month"}
          </div>
        </div>

        <div className="mt-3 flex items-end gap-3">
          <div className="text-5xl font-semibold tabular-nums">
            {loading ? "…" : value}
          </div>
          <div className="pb-2 text-sm text-emerald-600">
            {loading ? "" : deltaText}
          </div>
        </div>

        <div className="mt-4 h-[193px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={loading ? mockTrend : points}>
              <XAxis dataKey="label" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid #e4e4e7",
                  background: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={3}
                dot={false}
                stroke="#4F46E5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const mockTrend = [
  { label: "W1", value: 62 },
  { label: "W2", value: 74 },
  { label: "W3", value: 69 },
  { label: "W4", value: 82 },
];
