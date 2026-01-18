"use client";

import { ChevronDown, FileText } from "lucide-react";
import type { OpsPulseProfile } from "./lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function TopBar({
  title,
  subtitle,
  profile,
  onProfileChange,
}: {
  title: string;
  subtitle: string;
  profile: OpsPulseProfile;
  onProfileChange: (p: OpsPulseProfile) => void;
}) {
  const label = profile === "default" ? "Default" : "Infra";

  const handleDownload = () => {
    // ✅ backend endpoint that generates doc report
    const url = `http://127.0.0.1:8000/report/download?profile=${profile}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>
      </div>

      {/* ✅ RIGHT CONTROLS */}
      <div className="flex items-center gap-3">
        {/* ✅ Fancy report button */}
        <Button
          onClick={handleDownload}
          className="rounded-full bg-[#000000] text-white shadow-sm hover:opacity-110"
        >
          <FileText className="h-4 w-4" />
          Executive Brief
        </Button>

        {/* ✅ Profile dropdown (unchanged) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full bg-[#F6F4EF] border-zinc-200 shadow-sm"
            >
              {label}
              <ChevronDown className="ml-2 h-4 w-4 text-zinc-600" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={() => onProfileChange("default")}>
              Default
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onProfileChange("infra")}>
              Infra
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
