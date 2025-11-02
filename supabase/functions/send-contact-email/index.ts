import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: Track submissions by IP
const rateLimit = new Map<string, number[]>();

// HTML escaping to prevent XSS attacks
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return text.replace(/[&<>"'\/]/g, (char) => map[char]);
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
    // Rate limiting: Allow max 3 submissions per hour per IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    
    const submissions = rateLimit.get(ip) || [];
    const recentSubmissions = submissions.filter(time => now - time < 3600000); // 1 hour
    
    if (recentSubmissions.length >= 3) {
      console.log("Rate limit exceeded for IP:", ip);
      return new Response(
        JSON.stringify({ error: 'Trop de demandes. Veuillez réessayer dans une heure.' }),
        { 
          status: 429, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }
    
    rateLimit.set(ip, [...recentSubmissions, now]);
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance to clean up
      for (const [key, times] of rateLimit.entries()) {
        const recent = times.filter(time => now - time < 3600000);
        if (recent.length === 0) {
          rateLimit.delete(key);
        } else {
          rateLimit.set(key, recent);
        }
      }
    }

    const { name, email, company, subject, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Send email to company (with HTML escaping to prevent XSS)
    const emailResponse = await resend.emails.send({
      from: "Triton West Africa <onboarding@resend.dev>",
      to: ["all.ntic225@gmail.com"],
      replyTo: email,
      subject: `Nouveau message de contact: ${escapeHtml(subject)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0D2C54; border-bottom: 3px solid #1AB8CA; padding-bottom: 10px;">
            Nouveau message de contact
          </h1>
          
          <div style="background-color: #f5f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nom:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${company ? `<p style="margin: 10px 0;"><strong>Entreprise:</strong> ${escapeHtml(company)}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Sujet:</strong> ${escapeHtml(subject)}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0D2C54;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
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

    // Send confirmation email to user (with HTML escaping)
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
            Bonjour ${escapeHtml(name)},
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Nous avons bien reçu votre message concernant "<strong>${escapeHtml(subject)}</strong>".
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Notre équipe vous contactera dans les plus brefs délais pour répondre à votre demande.
          </p>
          
          <div style="background-color: #f5f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0D2C54; margin-top: 0;">Votre message:</h3>
            <p style="line-height: 1.6; color: #666;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
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
    // Log minimal info to avoid exposing sensitive details
    console.error("Email function error occurred", {
      timestamp: new Date().toISOString(),
      hasError: !!error,
      errorType: error?.constructor?.name
    });
    
    return new Response(
      JSON.stringify({ error: "Une erreur s'est produite lors de l'envoi du message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
