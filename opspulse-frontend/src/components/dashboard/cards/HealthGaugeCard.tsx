"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function HealthGaugeCard({
  scorePercent,
  scoreNumerator,
  scoreDenominator,
  loading,
}: {
  scorePercent: number; // 0..100
  scoreNumerator: number;
  scoreDenominator: number;
  loading?: boolean;
}) {
  const pct = clamp01(scorePercent / 100);

  const radius = 118;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;

  // Show partial arc (apple gauge look)
  const arc = circumference * 0.72;
  const dashOffset = arc * (1 - pct);

  return (
    <Card className="rounded-3xl border-zinc-200 bg-[#FAF8F3] shadow-sm">
      <CardHeader className="pb-0">
        <div className="text-xl font-semibold">Health Score</div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex items-center justify-center">
          <div className="relative h-[280px] w-[280px]">
            <svg viewBox="0 0 320 320" className="h-full w-full">
              <g transform="translate(160,160)">
                <g transform="rotate(135)">
                  {/* track */}
                  <circle
                    r={radius}
                    cx="0"
                    cy="0"
                    fill="transparent"
                    stroke="#E7E4DD"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${arc} ${circumference}`}
                    strokeDashoffset={0}
                  />

                  {/* progress */}
                  <circle
                    r={radius}
                    cx="0"
                    cy="0"
                    fill="transparent"
                    stroke="#FF6A00"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${arc} ${circumference}`}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 400ms ease" }}
                  />
                </g>
              </g>
            </svg>

            {/* center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-6xl font-semibold tabular-nums">
                {loading ? "…" : Math.round(scorePercent)}
                <span className="text-2xl text-zinc-700">%</span>
              </div>

              <div className="mt-2 text-sm text-zinc-600">Overall Health</div>

              <div className="mt-1 text-sm text-zinc-700">
                Your Score{" "}
                <span className="font-semibold text-[#FF6A00] tabular-nums">
                  {loading ? "…" : scoreNumerator} /{" "}
                  {loading ? "…" : scoreDenominator}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center text-xs text-zinc-500">
          Scoring computed from config taxonomy + weights
        </div>
      </CardContent>
    </Card>
  );
}
