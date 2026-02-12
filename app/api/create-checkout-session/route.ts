import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { config } from "@/lib/config";

export async function POST(req: Request) {
  const body = await req.json();
  const reportId = body.reportId as string;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${config.baseUrl}/zh-CN?paid=1&reportId=${reportId}`,
    cancel_url: `${config.baseUrl}/zh-CN?paid=0&reportId=${reportId}`,
    metadata: { reportId }
  });

  return NextResponse.json({ url: session.url });
}
