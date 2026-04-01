import { Resend } from "resend";
import * as React from "react";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EventEmailParams {
  userEmail: string;
  userName?: string;
  formName: string;
  status: string;
  message: string;
  eventId: string;
}

/**
 * Sends an email to a user after a specific event occurs.
 */
export async function sendUserEventEmail({
  userEmail,
  userName,
  formName,
  status,
  message,
  eventId,
}: EventEmailParams) {
  const { data, error } = await resend.emails.send({
    from: "Gram Panchayat <notifications@hostmyidea.me>",
    to: [userEmail],
    subject: `Update on your ${formName} - Gram Panchayat`,
    react: EmailTemplate({
      firstName: userName,
      formName,
      status,
      message,
    }) as React.ReactElement,
  });

  if (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }

  console.log("Email sent successfully:", data);
  return { success: true, data };
}
