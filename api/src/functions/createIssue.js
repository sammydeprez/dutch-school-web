const { app } = require('@azure/functions');

// Parse multipart form data manually
async function parseMultipartFormData(request) {
  const contentType = request.headers.get('content-type') || '';

  // If JSON, parse as before for backward compatibility
  if (contentType.includes('application/json')) {
    const body = await request.json();
    return { fields: body, files: [] };
  }

  // Parse multipart form data
  const formData = await request.formData();
  const fields = {};
  const files = [];

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      files.push(value);
    } else {
      fields[key] = value;
    }
  }

  return { fields, files };
}

// Upload a file to GitHub repository
async function uploadFileToGitHub(file, githubToken, context) {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `.github/change-request-attachments/${timestamp}-${safeName}`;

  // Read file as base64
  const arrayBuffer = await file.arrayBuffer();
  const base64Content = Buffer.from(arrayBuffer).toString('base64');

  context.log(`Uploading file: ${path}`);

  const response = await fetch(`https://api.github.com/repos/sammydeprez/dutch-school-web/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `[skip ci] Add attachment: ${safeName}`,
      content: base64Content,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    context.log(`Failed to upload file ${file.name}:`, error);
    throw new Error(`Failed to upload ${file.name}`);
  }

  const result = await response.json();
  return {
    name: file.name,
    url: result.content.html_url,
    downloadUrl: result.content.download_url,
    type: file.type,
  };
}

app.http('create-issue', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('Create-issue function invoked');

    try {
      const { fields, files } = await parseMultipartFormData(request);
      context.log('Form fields:', JSON.stringify(fields));
      context.log('Number of files:', files.length);

      const { title, description, page, type, submittedBy } = fields || {};

      // Validate required fields
      if (!title || !description) {
        return {
          status: 400,
          jsonBody: { error: 'Title and description are required' }
        };
      }

      // Get GitHub token from environment variable
      const githubToken = process.env.GITHUB_TOKEN;
      context.log('GitHub token present:', !!githubToken);

      if (!githubToken) {
        return {
          status: 500,
          jsonBody: { error: 'GitHub token not configured' }
        };
      }

      // Upload attachments first
      const uploadedFiles = [];
      for (const file of files) {
        try {
          const uploaded = await uploadFileToGitHub(file, githubToken, context);
          uploadedFiles.push(uploaded);
        } catch (error) {
          context.log(`Error uploading file ${file.name}:`, error.message);
          // Continue with other files even if one fails
        }
      }

      // Build attachments section
      let attachmentsSection = '';
      if (uploadedFiles.length > 0) {
        attachmentsSection = '\n\n## Attachments\n';
        uploadedFiles.forEach((file) => {
          if (file.type.startsWith('image/')) {
            // Display images inline
            attachmentsSection += `### ${file.name}\n![${file.name}](${file.downloadUrl})\n\n`;
          } else {
            // Link to other files
            attachmentsSection += `- [${file.name}](${file.url})\n`;
          }
        });
      }

      // Build issue body
      const issueBody = `## Description
${description}

## Details
- **Page/Section:** ${page || 'Not specified'}
- **Type:** ${type || 'Change Request'}
- **Submitted by:** ${submittedBy || 'Anonymous'}
- **Submitted at:** ${new Date().toISOString()}
${attachmentsSection}
---
*Submitted via Change Request Form*`;

      // Create labels
      const labels = ['by-users'];

      context.log('Making request to GitHub API...');
      const response = await fetch('https://api.github.com/repos/sammydeprez/dutch-school-web/issues', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `[${type || 'Request'}] ${title}`,
          body: issueBody,
          labels: labels,
        }),
      });

      context.log('GitHub API response status:', response.status);

      if (!response.ok) {
        const error = await response.text();
        context.log('GitHub API error:', error);
        return {
          status: response.status,
          jsonBody: { error: `GitHub API error: ${error}` }
        };
      }

      const issue = await response.json();
      context.log('Issue created:', issue.number);

      return {
        status: 201,
        jsonBody: {
          success: true,
          issueNumber: issue.number,
          issueUrl: issue.html_url
        }
      };
    } catch (error) {
      context.log('Unhandled error:', error.message, error.stack);
      return {
        status: 500,
        jsonBody: { error: `Failed to create issue: ${error.message}` }
      };
    }
  }
});
