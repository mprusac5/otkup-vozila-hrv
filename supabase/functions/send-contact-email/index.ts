import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  car_make_model: string;
  year: string;
  mileage: string;
  fuel_type?: string;
  transmission?: string;
  engine_size?: string;
  engine_power?: string;
  additional_info?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Received contact form data:", data);

    // Email to business owner
    const ownerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ea384c 0%, #f97316 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">🚗 Otkup Automobila</h1>
      <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Novi upit za otkup vozila</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">📩 Novi Upit</h2>

      <!-- Client Info -->
      <div style="background-color: #f8fafc; border-left: 4px solid #ea384c; padding: 20px; margin: 25px 0; border-radius: 6px;">
        <h3 style="color: #ea384c; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">👤 Informacije o klijentu</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 40%;">Ime i prezime:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Telefon:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.phone}</td>
          </tr>
        </table>
      </div>

      <!-- Vehicle Info -->
      <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 6px;">
        <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🚙 Detalji vozila</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 40%;">Marka i model:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.car_make_model}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Godina:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.year}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Kilometraža:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.mileage} km</td>
          </tr>
          ${data.fuel_type ? `<tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Vrsta goriva:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.fuel_type}</td>
          </tr>` : ''}
          ${data.transmission ? `<tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Mjenjač:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.transmission}</td>
          </tr>` : ''}
          ${data.engine_size ? `<tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Kubikaža:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.engine_size}</td>
          </tr>` : ''}
          ${data.engine_power ? `<tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Snaga motora:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.engine_power} kW</td>
          </tr>` : ''}
        </table>
      </div>

      ${data.additional_info ? `
      <!-- Additional Info -->
      <div style="background-color: #fefce8; border-left: 4px solid #eab308; padding: 20px; margin: 25px 0; border-radius: 6px;">
        <h3 style="color: #ca8a04; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">📝 Dodatne informacije</h3>
        <p style="color: #1a1a1a; margin: 0; line-height: 1.6;">${data.additional_info}</p>
      </div>
      ` : ''}

      <!-- Action CTA -->
      <div style="background: linear-gradient(135deg, #ea384c 0%, #f97316 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
        <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 600;">⚡ Kontaktirajte klijenta što prije!</p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b; margin: 0; font-size: 13px;">
        Automatska obavijest iz kontakt forme<br>
        <strong style="color: #ea384c;">Otkup Automobila</strong>
      </p>
    </div>

  </div>
</body>
</html>`;

    // Send email to business owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Otkup Automobila <onboarding@resend.dev>",
      to: ["marinprusac5@gmail.com"],
      subject: `🚗 Novi Upit - ${data.car_make_model} (${data.year})`,
      html: ownerEmailHtml,
    });

    console.log("Owner email sent:", ownerEmailResponse);

    // Auto-response email to client
    const clientEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ea384c 0%, #f97316 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">Otkup Automobila</h1>
      <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Brza i pouzdana procjena vozila</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      
      <h2 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 22px; font-weight: 600;">Poštovani/a ${data.name},</h2>
      
      <p style="color: #4a5568; line-height: 1.8; margin: 20px 0; font-size: 15px;">
        Hvala Vam na pokazanom interesu za naše usluge otkupa vozila!
      </p>

      <p style="color: #4a5568; line-height: 1.8; margin: 20px 0; font-size: 15px;">
        Primili smo Vaš zahtjev za ponudu i zahvaljujemo se na Vašem povjerenju. 
        Vaš upit je trenutno u obradi i uskoro će biti razmotren.
      </p>

      <!-- Request Details -->
      <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 6px;">
        <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">📋 Detalji Vašeg zahtjeva:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Vozilo:</td>
            <td style="padding: 6px 0; color: #1a1a1a; font-weight: 600;">${data.car_make_model}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Godina:</td>
            <td style="padding: 6px 0; color: #1a1a1a; font-weight: 600;">${data.year}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Kilometraža:</td>
            <td style="padding: 6px 0; color: #1a1a1a; font-weight: 600;">${data.mileage} km</td>
          </tr>
        </table>
      </div>

      <p style="color: #4a5568; line-height: 1.8; margin: 20px 0; font-size: 15px; font-weight: 500;">
        Javit ćemo Vam se povratno u najkraćem mogućem roku kako bismo dogovorili sve potrebne detalje.
      </p>

      <!-- What's Next -->
      <div style="background-color: #f8fafc; padding: 20px; margin: 25px 0; border-radius: 6px;">
        <h3 style="color: #ea384c; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🔄 Što slijedi?</h3>
        <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;">
          <li style="margin: 8px 0;">Pregledat ćemo Vašu ponudu u najkraćem roku</li>
          <li style="margin: 8px 0;">Kontaktirat ćemo Vas putem telefona ili emaila u roku od 24 sata</li>
          <li style="margin: 8px 0;">Dogovorit ćemo pregled vozila na lokaciji koja vama odgovara</li>
          <li style="margin: 8px 0;">Nakon pregleda, odmah ćete dobiti konkretnu ponudu</li>
        </ul>
      </div>

      <!-- Key Benefits -->
      <div style="background: linear-gradient(135deg, #ea384c 0%, #f97316 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
        <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 600; line-height: 1.6;">
          Brza procjena ⚡ Fer ponuda 🤝 Trenutna isplata 💰
        </p>
      </div>

      <p style="color: #4a5568; line-height: 1.8; margin: 20px 0; font-size: 15px;">
        U međuvremenu, ako imate dodatnih pitanja ili želite razgovarati s nama, slobodno nas kontaktirajte:
      </p>

      <!-- Contact Info -->
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 8px 0; color: #1a1a1a;">
          <span style="font-size: 18px;">📞</span> 
          <strong style="color: #4a5568;">Telefon:</strong> 
          <span style="color: #ea384c; font-weight: 600;">+385 91 559 4259</span>
        </p>
        <p style="margin: 8px 0; color: #1a1a1a;">
          <span style="font-size: 18px;">✉️</span> 
          <strong style="color: #4a5568;">Email:</strong> 
          <span style="color: #ea384c; font-weight: 600;">otkupvozilagt@gmail.com</span>
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b; margin: 0 0 5px 0; font-size: 14px;">S poštovanjem,</p>
      <p style="color: #ea384c; margin: 0; font-size: 16px; font-weight: 700;">Otkup Automobila</p>
    </div>

  </div>
</body>
</html>`;

    const clientEmailResponse = await resend.emails.send({
      from: "Otkup Automobila <noreply@otkupvozilahrv.eu>",
      to: [data.email],
      subject: "Zaprimili smo Vaš upit - Otkup Automobila",
      html: clientEmailHtml,
    });

    console.log("Client auto-response email sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully",
        ownerEmail: ownerEmailResponse,
        clientEmail: clientEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
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
