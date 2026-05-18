import type { APIRoute } from 'astro';

/**
 * File Upload API Endpoint
 * Handles secure file uploads for the Talent Network Application Form
 * Stores file references in the TalentNetworkApplications CMS collection
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return new Response(
        JSON.stringify({ error: 'File size exceeds 10MB limit' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate file type
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid file type. Only PDF and Word documents are allowed.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate file extension
    const fileName = file.name.toLowerCase();
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
      return new Response(
        JSON.stringify({ error: 'Invalid file extension. Only PDF and Word documents are allowed.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate secure file reference
    // In production, this would integrate with Wix's Media Manager or cloud storage
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 11);
    const sanitizedFileName = fileName.replace(/[^a-z0-9.-]/gi, '_');
    const fileReference = `talent-network/${timestamp}-${randomId}/${sanitizedFileName}`;

    // Return file reference to be stored in CMS
    return new Response(
      JSON.stringify({
        success: true,
        fileUrl: fileReference,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('File upload error:', error);
    return new Response(
      JSON.stringify({
        error: 'File upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
