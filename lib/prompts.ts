import fs from "node:fs";
import path from "node:path";

export type PromptName = "community-analysis" | "floorplan-dimensions" | "annotation-style" | "summary-and-advice";

const promptDir = path.join(process.cwd(), "packages", "prompts");

export function loadPrompt(name: PromptName): string {
  const filePath = path.join(promptDir, `${name}.md`);
  return fs.readFileSync(filePath, "utf-8");
}
