import type { APIRoute } from 'astro';

/**
 * Email Notification API
 * Handles sending confirmation and notification emails for applications
 * 
 * CRITICAL PRODUCTION NOTES:
 * - This endpoint currently logs emails to console for development
 * - In production, integrate with actual email service (SendGrid, AWS SES, Mailgun, etc.)
 * - Verify SPF, DKIM, DMARC records for email deliverability
 * - Implement retry logic for failed email sends
 * - Track email delivery status
 */

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
      to,
      subject,
      applicantName,
      applicantEmail,
      program,
      message,
      // Legacy consultation fields
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
    if (!to || !subject) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build email body based on provided data
    let emailBody = message || '';

    // If legacy consultation data provided, format it
    if (consultationId && !message) {
      const consultationTypeLabel = consultationType === 'emergency' ? 'Emergency Legal Consultation' : 'Standard Legal Consultation';
      
      emailBody = `
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
    }

    // Log email details for debugging and monitoring
    // In production, this should be sent to actual email service
    const emailLog = {
      timestamp: new Date().toISOString(),
      to,
      subject,
      from: 'noreply@jmclex.com',
      applicantName: applicantName || clientName,
      applicantEmail: applicantEmail || clientEmail,
      program,
      bodyPreview: emailBody.substring(0, 100) + '...',
      status: 'logged_for_delivery'
    };

    console.log('📧 EMAIL NOTIFICATION:', JSON.stringify(emailLog, null, 2));
    console.log('📧 FULL EMAIL BODY:', emailBody);

    // TODO: PRODUCTION EMAIL INTEGRATION
    // Replace this section with actual email service integration
    // Example services: SendGrid, AWS SES, Mailgun, Postmark, etc.
    /*
    const emailService = new EmailService({
      apiKey: process.env.EMAIL_SERVICE_API_KEY,
      from: 'noreply@jmclex.com'
    });

    try {
      const result = await emailService.send({
        to,
        subject,
        html: formatEmailAsHTML(emailBody),
        text: emailBody,
        replyTo: 'contact@jmclex.com'
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email sent successfully',
          messageId: result.id,
          timestamp: new Date().toISOString()
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (emailError) {
      console.error('Email service error:', emailError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email delivery failed',
          details: emailError instanceof Error ? emailError.message : 'Unknown error'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    */

    // For now, return success (emails are logged to console)
    // This allows the application to proceed while email infrastructure is being set up
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email notification logged for delivery',
        to,
        subject,
        timestamp: new Date().toISOString(),
        note: 'In production, this email would be sent via email service provider'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('❌ Email processing error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process email notification',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
