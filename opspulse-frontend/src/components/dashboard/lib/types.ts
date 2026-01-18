export type OpsPulseProfile = "default" | "infra";

export type OpsPulseSnapshot = {
  health: {
    scorePercent: number;
    scoreNumerator: number;
    scoreDenominator: number;
  };
  stats: {
    resources: { value: number | string; subtext: string };
    probes: { value: number | string; subtext: string };
    cache: { value: number | string; subtext: string };
  };
  trend: {
    summaryValue: string;
    deltaText: string;
    points: Array<{ label: string; value: number }>;
  };
  areasToAddress: Array<{ label: string; value: string; tag?: string }>;
  breakdown: Array<{ label: string; value: number }>;
};
