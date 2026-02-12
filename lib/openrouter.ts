import { config } from "@/lib/config";

export async function runVisionAnalysis(input: { imageBase64: string; prompt: string }) {
  const resp = await fetch(`${config.openRouterBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: config.openRouterVisionModel,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: input.prompt },
            { type: "image_url", image_url: { url: `data:image/png;base64,${input.imageBase64}` } }
          ]
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!resp.ok) {
    throw new Error(`OpenRouter vision failed: ${resp.status}`);
  }

  const json = await resp.json();
  return json.choices?.[0]?.message?.content || "{}";
}

export async function runSummary(prompt: string) {
  const resp = await fetch(`${config.openRouterBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: config.openRouterSummaryModel,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!resp.ok) {
    throw new Error(`OpenRouter summary failed: ${resp.status}`);
  }

  const json = await resp.json();
  return json.choices?.[0]?.message?.content || "";
}
