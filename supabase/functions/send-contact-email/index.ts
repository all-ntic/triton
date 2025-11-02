import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, subject, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Send email to company
    const emailResponse = await resend.emails.send({
      from: "Triton West Africa <onboarding@resend.dev>",
      to: ["all.ntic225@gmail.com"],
      replyTo: email,
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0D2C54; border-bottom: 3px solid #1AB8CA; padding-bottom: 10px;">
            Nouveau message de contact
          </h1>
          
          <div style="background-color: #f5f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nom:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 10px 0;"><strong>Entreprise:</strong> ${company}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Sujet:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0D2C54;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px;">
              Ce message a été envoyé depuis le formulaire de contact du site web Triton West Africa
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to user
    await resend.emails.send({
      from: "Triton West Africa <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation de réception - Triton West Africa",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0D2C54; border-bottom: 3px solid #1AB8CA; padding-bottom: 10px;">
            Message bien reçu !
          </h1>
          
          <p style="line-height: 1.6; color: #333;">
            Bonjour ${name},
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Nous avons bien reçu votre message concernant "<strong>${subject}</strong>".
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Notre équipe vous contactera dans les plus brefs délais pour répondre à votre demande.
          </p>
          
          <div style="background-color: #f5f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0D2C54; margin-top: 0;">Votre message:</h3>
            <p style="line-height: 1.6; color: #666;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p style="line-height: 1.6; color: #333;">
            Cordialement,<br>
            <strong>L'équipe Triton West Africa</strong>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #1AB8CA; font-weight: bold;">Triton West Africa</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">
              Avenue 19, Rue 7, Zone 2<br>
              Treichville, Abidjan, Côte d'Ivoire<br>
              Tél: (+225) 27 21 35 96 72 / (+225) 07 07 16 18 30
            </p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
