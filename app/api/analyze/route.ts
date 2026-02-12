import { NextResponse } from "next/server";
import { z } from "zod";
import { geocodeCommunity } from "@/lib/amap";
import { loadPrompt } from "@/lib/prompts";
import { runSummary, runVisionAnalysis } from "@/lib/openrouter";
import { saveReport } from "@/lib/store";

const Input = z.object({
  imageBase64: z.string().min(10),
  location: z.string().min(2),
  residents: z.number().min(1).max(20)
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = Input.parse(body);

  const geo = await geocodeCommunity(parsed.location);
  const communityPrompt = `${loadPrompt("community-analysis")}\n地址:${parsed.location}\n地理结果:${JSON.stringify(geo)}`;
  const floorPrompt = `${loadPrompt("floorplan-dimensions")}\n居住人数:${parsed.residents}\n${loadPrompt("annotation-style")}`;

  const community = await runVisionAnalysis({ imageBase64: parsed.imageBase64, prompt: communityPrompt });
  const floor = await runVisionAnalysis({ imageBase64: parsed.imageBase64, prompt: floorPrompt });
  const full = await runSummary(`${loadPrompt("summary-and-advice")}\n小区分析:${community}\n户型分析:${floor}`);

  const reportId = crypto.randomUUID();
  const partial = `社区摘要:\n${String(community).slice(0, 300)}\n\n户型摘要:\n${String(floor).slice(0, 300)}`;

  saveReport({ id: reportId, partial, full, unlocked: false });

  return NextResponse.json({ id: reportId, partial, full, unlocked: false });
}
