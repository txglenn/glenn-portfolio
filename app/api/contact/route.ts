import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, project_type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Supabase: best-effort — failure does NOT block the response
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase
          .from("contact_submissions")
          .insert({ name, email, phone, project_type, message });
      }
    } catch (dbErr) {
      // Log but continue — email notification is what matters
      console.warn("Supabase insert failed (non-critical):", dbErr);
    }

    // Email via Resend — this is the primary notification
    await resend.emails.send({
      from: "Glenn Portfolio <onboarding@resend.dev>",
      to: "txglenn04@gmail.com",
      subject: `New Inquiry — ${name}`,
      text: [
        "NEW PROJECT INQUIRY",
        "───────────────────────",
        `Name:         ${name}`,
        `Email:        ${email}`,
        `Phone:        ${phone || "not provided"}`,
        `Looking for:  ${project_type || "not selected"}`,
        "",
        "Message:",
        message,
        "",
        "Reply directly to this email to reach them.",
      ].join("\n"),
      reply_to: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
