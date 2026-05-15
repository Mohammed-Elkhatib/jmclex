import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await request.json();
    
    const {
      consultationId,
      clientName,
      clientEmail,
      clientPhone,
      caseDetails,
      preferredDate,
      preferredTime,
      consultationType,
      consultationPrice,
      adminEmail
    } = data;

    // Validate required fields
    if (!clientName || !clientEmail || !adminEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format the consultation details for email
    const consultationTypeLabel = consultationType === 'emergency' ? 'Emergency Legal Consultation' : 'Standard Legal Consultation';
    
    // Email to admin
    const adminEmailBody = `
New Consultation Request Submitted

Consultation ID: ${consultationId}
Type: ${consultationTypeLabel}
Price: $${consultationPrice}

Client Information:
Name: ${clientName}
Email: ${clientEmail}
Phone: ${clientPhone}

Consultation Details:
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}

Case Details:
${caseDetails}

---
This is an automated notification from your legal consultation system.
Please follow up with the client within 24 hours.
    `.trim();

    // Email to client
    const clientEmailBody = `
Thank you for your consultation request!

We have received your ${consultationTypeLabel.toLowerCase()} request and will contact you within 24 hours to confirm your appointment and provide payment instructions.

Consultation Details:
- Type: ${consultationTypeLabel}
- Fee: $${consultationPrice}
- Preferred Date: ${preferredDate}
- Preferred Time: ${preferredTime}

Your Reference ID: ${consultationId}

If you have any questions, please don't hesitate to reach out.

Best regards,
JMC Legal Team
    `.trim();

    // Log the email details (in production, you would use a real email service)
    console.log('Admin Email:', {
      to: adminEmail,
      subject: `New Consultation Request - ${clientName}`,
      body: adminEmailBody
    });

    console.log('Client Email:', {
      to: clientEmail,
      subject: 'Consultation Request Confirmation',
      body: clientEmailBody
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Consultation request processed successfully',
        consultationId
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing consultation email:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process consultation request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
