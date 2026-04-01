import * as React from "react";

interface EmailTemplateProps {
  firstName?: string;
  formName?: string;
  status?: string;
  message: string;
}

export function EmailTemplate({
  firstName = "Citizen",
  formName,
  status,
  message,
}: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Welcome, {firstName}!</h2>
      {formName && status && (
        <p>
          Update on your <strong>{formName}</strong>: The status is now{" "}
          <strong>{status}</strong>.
        </p>
      )}
      <p>{message}</p>
      <hr />
      <p style={{ fontSize: "12px", color: "#666" }}>
        This is an automated message from the Gram Panchayat administration.
      </p>
    </div>
  );
}
