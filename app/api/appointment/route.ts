import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      whatsapp,
      service,
      preferred_date,
      preferred_time,
      message,
    } = body;

    // Save appointment in Supabase
    const { error } = await supabase.from("appointments").insert([
      {
        name,
        email,
        whatsapp,
        service,
        preferred_date,
        preferred_time,
        message,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Send email notification
    await resend.emails.send({
      from: "Optiwebx <onboarding@resend.dev>",
      to: ["hassnainabdulbari@gmail.com"], // apna email
      subject: "📅 New AI Appointment",
      html: `
        <h2>New Appointment Received</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${preferred_date}</p>
        <p><strong>Time:</strong> ${preferred_time}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}