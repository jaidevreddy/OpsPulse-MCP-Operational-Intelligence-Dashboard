"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AreasToAddressCard({
  items,
  loading,
}: {
  items: Array<{ label: string; value: string; tag?: string }>;
  loading?: boolean;
}) {
  return (
    <Card className="rounded-3xl border-zinc-200 bg-[#FAF8F3] shadow-sm">
      <CardHeader className="pb-2">
        <div className="text-xl font-semibold">Summary</div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="space-y-4">
          {(loading ? Array.from({ length: 4 }) : items).map(
            (it: any, idx: number) => (
              <div key={idx}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500">
                      {loading ? "Loading…" : it.tag ?? "Recommendation"}
                    </div>

                    {/* ✅ Change: allow 2 lines instead of single-line truncate */}
                    <div
                      className="mt-1 text-sm font-medium text-zinc-900 line-clamp-2"
                      title={loading ? "" : it.label}
                    >
                      {loading ? "Fetching summary…" : it.label}
                    </div>
                  </div>

                  {!loading && it.value ? (
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-white/60 text-zinc-700 border border-zinc-200"
                    >
                      {it.value}
                    </Badge>
                  ) : null}
                </div>

                {idx !== (loading ? 3 : items.length - 1) ? (
                  <Separator className="mt-4" />
                ) : null}
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
