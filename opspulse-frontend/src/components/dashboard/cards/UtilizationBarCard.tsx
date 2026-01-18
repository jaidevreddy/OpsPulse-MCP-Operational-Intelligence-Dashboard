"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

type UtilBar = {
  label: string;
  value: number;
  meta?: {
    mode?: string;
    keyword?: string;
    signals?: number;
  };
};

export default function UtilizationBarCard({
  title,
  bars,
  loading,
}: {
  title: string;
  bars: UtilBar[];
  loading?: boolean;
}) {
  const data = loading ? mockBars : bars;

  return (
    <Card className="rounded-3xl border-zinc-200 bg-[#FAF8F3] shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{title}</div>
        </div>

        <div className="mt-2 text-sm text-zinc-600">
          Average Score <span className="font-semibold">{average(data)}</span>
        </div>

        <div className="mt-4 h-[213px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap={28}>
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                className="text-xs"
                interval={0}
              />
              <YAxis hide domain={[0, 100]} />

              {/* ✅ only change: tooltip shows meta info when available */}
              <Tooltip
                formatter={(value: any, name: any, props: any) => {
                  const payload = props?.payload as UtilBar | undefined;

                  // normal tooltip
                  if (!payload?.meta || payload?.meta?.mode !== "keyword_dynamic") {
                    return [`${value}%`, payload?.label ?? "value"];
                  }

                  // keyword-driven tooltip (Payments)
                  const keyword = payload.meta.keyword ?? "-";
                  const signals = payload.meta.signals ?? 0;

                  return [`${value}% (signals: ${signals})`, `${payload.label} | ${keyword}`];
                }}
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid #e4e4e7",
                  background: "#fff",
                }}
              />

              <ReferenceLine y={80} stroke="#111827" strokeDasharray="6 6" />
              <Bar dataKey="value" radius={[12, 12, 12, 12]} fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function average(arr: Array<{ value: number }>) {
  if (!arr.length) return "0";
  const sum = arr.reduce((a, b) => a + b.value, 0);
  return (sum / arr.length).toFixed(1);
}

const mockBars: UtilBar[] = [
  { label: "App/API", value: 62 },
  {
    label: "Payments",
    value: 70,
    meta: {
      mode: "keyword_dynamic",
      keyword: "payment failure",
      signals: 2,
    },
  },
  { label: "Customer", value: 66 },
  { label: "Support", value: 73 },
  { label: "SLA", value: 52 },
];
