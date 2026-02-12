import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { unlockReport } from "@/lib/store";

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const reportId = session.metadata?.reportId;
    if (reportId) unlockReport(reportId);
  }

  return NextResponse.json({ ok: true });
}
