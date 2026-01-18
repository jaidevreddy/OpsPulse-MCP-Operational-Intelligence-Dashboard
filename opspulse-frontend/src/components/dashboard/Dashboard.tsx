"use client";

import { useEffect, useMemo, useState } from "react";
import TopBar from "./TopBar";

import type { OpsPulseProfile, OpsPulseSnapshot } from "./lib/types";
import { fetchOpsPulseSnapshot } from "./lib/api";

import HealthGaugeCard from "./cards/HealthGaugeCard";
import AreasToAddressCard from "./cards/AreasToAddressCard";
import StatCard from "./cards/StatCard";
import TrendLineCard from "./cards/TrendLineCard";
import UtilizationBarCard from "./cards/UtilizationBarCard";

export default function Dashboard() {
  const [profile, setProfile] = useState<OpsPulseProfile>("default");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OpsPulseSnapshot | null>(null);

  const subtitleDate = useMemo(() => {
    const d = new Date();
    const day = d.toLocaleDateString(undefined, { weekday: "long" });
    const dt = d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return `Operational Intelligence Dashboard MCP Server • ${day}, ${dt}`;
  }, []);

  // ✅ Re-fetch snapshot whenever profile changes
  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        const snapshot = await fetchOpsPulseSnapshot(profile);

        if (!cancelled) {
          setData(snapshot);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [profile]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <TopBar
        title="OPS Pulse"
        subtitle={subtitleDate}
        profile={profile}
        onProfileChange={setProfile}
      />

      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <HealthGaugeCard
            scorePercent={data?.health.scorePercent ?? 0}
            scoreNumerator={data?.health.scoreNumerator ?? 0}
            scoreDenominator={data?.health.scoreDenominator ?? 0}
            loading={loading}
          />

          <AreasToAddressCard
            items={data?.areasToAddress ?? []}
            loading={loading}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Top grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT COLUMN */}
            <div className="col-span-12 md:col-span-6 space-y-6">
              <StatCard
                title="Resources"
                icon="users"
                value={data?.stats.resources.value ?? "—"}
                subtext={data?.stats.resources.subtext ?? ""}
                height="h-[180px]"
                loading={loading}
              />

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <StatCard
                    title="Probes"
                    icon="devices"
                    value={data?.stats.probes.value ?? "—"}
                    subtext={data?.stats.probes.subtext ?? ""}
                    height="h-[180px]"
                    compact
                    loading={loading}
                  />
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <StatCard
                    title="Cache"
                    icon="apps"
                    value={data?.stats.cache.value ?? "—"}
                    subtext={data?.stats.cache.subtext ?? ""}
                    height="h-[180px]"
                    compact
                    loading={loading}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 md:col-span-6 space-y-6">
              <TrendLineCard
                title="Health Trend"
                value={data?.trend.summaryValue ?? "—"}
                deltaText={data?.trend.deltaText ?? ""}
                points={data?.trend.points ?? []}
                loading={loading}
              />
            </div>
          </div>

          {/* Bottom chart */}
          <UtilizationBarCard
  title="Domain Breakdown"
  bars={data?.breakdown ?? []}
  loading={loading}
/>
        </div>
      </div>
    </div>
  );
}
