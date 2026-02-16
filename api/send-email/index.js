module.exports = async function (context, req) {
  context.log('Function invoked');

  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      context.res = {
        status: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
      return;
    }

    context.log('Request body:', JSON.stringify(req.body));
    const { name, email, phone, subject, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !subject || !message) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ error: 'Name, email, subject, and message are required' })
      };
      return;
    }

    // Get MailerSend API token from environment variable
    const apiToken = process.env.MAILERSEND_API_TOKEN;
    context.log('MailerSend token present:', !!apiToken);

    if (!apiToken) {
      context.res = {
        status: 500,
        headers,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
      return;
    }

    // Subject labels for better readability
    const subjectLabels = {
      enrollment: 'Enrollment Inquiry',
      tour: 'Schedule a Tour',
      programs: 'Program Information',
      fees: 'Fees & Payment',
      other: 'Other',
    };

    const subjectLabel = subjectLabels[subject] || subject;

    // Build email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Subject:</strong> ${subjectLabel}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br />')}</p>
      <hr />
      <p style="color: #666; font-size: 12px;">
        Submitted via Dutch School Nairobi website contact form<br />
        ${new Date().toISOString()}
      </p>
    `;

    const emailText = `
New Contact Form Submission

From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subjectLabel}

Message:
${message}

---
Submitted via Dutch School Nairobi website contact form
${new Date().toISOString()}
    `;

    context.log('Making request to MailerSend API...');
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: {
          email: 'dutch-school@test-r6ke4n1j35egon12.mlsender.net',
          name: 'Dutch School Nairobi Website',
        },
        to: [
          {
            email: 'sammydeprez@gmail.com',
            name: 'Dutch School Nairobi',
          },
        ],
        reply_to: {
          email: email,
          name: name,
        },
        subject: `[Contact Form] ${subjectLabel} - ${name}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    context.log('MailerSend API response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      context.log('MailerSend error:', error);
      context.res = {
        status: response.status,
        headers,
        body: JSON.stringify({ error: 'Failed to send email' })
      };
      return;
    }

    context.res = {
      status: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      })
    };
  } catch (error) {
    context.log('Unhandled error:', error.message, error.stack);
    context.res = {
      status: 500,
      headers,
      body: JSON.stringify({ error: `Failed to send email: ${error.message}` })
    };
  }
};
