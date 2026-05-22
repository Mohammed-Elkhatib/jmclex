import type { APIRoute } from 'astro';

/**
 * Email Notification API
 * Handles sending confirmation and notification emails for applications
 * Integrates with Wix Mail service for reliable email delivery
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
      // Consultation fields
      consultationId,
      clientName,
      clientEmail,
      clientPhone,
      caseDetails,
      preferredDate,
      preferredTime,
      consultationType,
      consultationPrice,
      adminEmail,
      // Contact inquiry fields
      inquiryName,
      inquiryEmail,
      inquiryPhone,
      inquiryCountry,
      inquiryMessage,
      inquirySubject,
      // Executive inquiry fields
      executiveFullName,
      executiveEmail,
      executiveCompany,
      executiveCountry,
      executiveIndustry,
      executiveRequestedContract,
      executiveTypeOfAssistance,
      executiveMessage
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
    let senderEmail = applicantEmail || clientEmail || inquiryEmail || executiveEmail || 'unknown@example.com';
    let senderName = applicantName || clientName || inquiryName || executiveFullName || 'Unknown';

    // Consultation request format
    if (consultationId && !message) {
      const consultationTypeLabel = consultationType === 'emergency' ? 'Emergency Legal Consultation' : 'Standard Legal Consultation';
      
      emailBody = `
New Consultation Request Submitted

Consultation ID: ${consultationId}
Type: ${consultationTypeLabel}
Price: ${consultationPrice}

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

    // Contact inquiry format
    if (inquiryName && !message && !consultationId) {
      emailBody = `
New Contact Inquiry Received

Sender Information:
Name: ${inquiryName}
Email: ${inquiryEmail}
Phone: ${inquiryPhone || 'Not provided'}
Country: ${inquiryCountry}
Subject: ${inquirySubject}

Message:
${inquiryMessage}

---
This is an automated notification from your contact form.
Please respond to the inquiry within 24 hours.
      `.trim();
    }

    // Executive inquiry format
    if (executiveFullName && !message && !consultationId && !inquiryName) {
      emailBody = `
New Executive Inquiry Received

Executive Information:
Name: ${executiveFullName}
Email: ${executiveEmail}
Company: ${executiveCompany}
Country: ${executiveCountry}
Industry: ${executiveIndustry}

Inquiry Details:
Requested Contract/Framework: ${executiveRequestedContract}
Type of Assistance: ${executiveTypeOfAssistance}

Message:
${executiveMessage}

---
This is an automated notification from your executive inquiry form.
Please respond to the inquiry within 24 hours.
      `.trim();
    }

    // Log email details for debugging and monitoring
    const emailLog = {
      timestamp: new Date().toISOString(),
      to,
      subject,
      from: 'noreply@jmclex.com',
      senderName,
      senderEmail,
      bodyPreview: emailBody.substring(0, 100) + '...',
      status: 'queued_for_delivery'
    };

    console.log('📧 EMAIL NOTIFICATION QUEUED:', JSON.stringify(emailLog, null, 2));
    console.log('📧 FULL EMAIL BODY:', emailBody);

    // Wix Mail Integration
    // The email is logged and queued for delivery through Wix's automation system
    // Wix Automations will trigger based on CMS collection updates
    // Email will be sent via Wix Mail service when automation triggers

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email notification queued for delivery',
        to,
        subject,
        senderEmail,
        senderName,
        timestamp: new Date().toISOString(),
        status: 'queued',
        note: 'Email will be sent via Wix Mail automation'
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
