import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import { getReport } from "@/lib/store";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const report = getReport(params.id);
  if (!report) return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json({
    id: report.id,
    partial: report.partial,
    full: config.commercialMode || report.unlocked ? report.full : null,
    unlocked: config.commercialMode || report.unlocked
  });
}
