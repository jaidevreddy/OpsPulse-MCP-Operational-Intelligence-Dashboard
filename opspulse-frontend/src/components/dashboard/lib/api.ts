import type { OpsPulseProfile, OpsPulseSnapshot } from "./types";

const BASE =
  process.env.NEXT_PUBLIC_OPSPULSE_API_BASE?.replace(/\/$/, "") ||
  "http://localhost:8000";

export async function fetchOpsPulseSnapshot(
  profile: OpsPulseProfile
): Promise<OpsPulseSnapshot> {
  const res = await fetch(`${BASE}/snapshot?profile=${profile}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`snapshot failed: ${res.status}`);
  }

  const snap = await res.json();

  // Ensure shape is compatible with frontend types
  return {
    health: {
      scorePercent: Number(snap?.health?.scorePercent ?? 0),
      scoreNumerator: Number(snap?.health?.scoreNumerator ?? 0),
      scoreDenominator: Number(snap?.health?.scoreDenominator ?? 0),
    },
    stats: {
      resources: {
        value: snap?.stats?.resources?.value ?? "—",
        subtext: snap?.stats?.resources?.subtext ?? "",
      },
      probes: {
        value: snap?.stats?.probes?.value ?? "—",
        subtext: snap?.stats?.probes?.subtext ?? "",
      },
      cache: {
        value: snap?.stats?.cache?.value ?? "—",
        subtext: snap?.stats?.cache?.subtext ?? "",
      },
    },
    trend: {
      summaryValue: snap?.trend?.summaryValue ?? "0",
      deltaText: snap?.trend?.deltaText ?? "",
      points: snap?.trend?.points ?? [],
    },
    areasToAddress: snap?.areasToAddress ?? [],
    breakdown: snap?.breakdown ?? [],
  };
}
