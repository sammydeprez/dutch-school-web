const fetch = require('node-fetch');

module.exports = async function (context, req) {
  context.log('Create-issue function invoked');

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
    const { title, description, page, type, submittedBy } = req.body || {};

    // Validate required fields
    if (!title || !description) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ error: 'Title and description are required' })
      };
      return;
    }

    // Get GitHub token from environment variable
    const githubToken = process.env.GITHUB_TOKEN;
    context.log('GitHub token present:', !!githubToken);

    if (!githubToken) {
      context.res = {
        status: 500,
        headers,
        body: JSON.stringify({ error: 'GitHub token not configured' })
      };
      return;
    }

    // Build issue body
    const issueBody = `## Description
${description}

## Details
- **Page/Section:** ${page || 'Not specified'}
- **Type:** ${type || 'Change Request'}
- **Submitted by:** ${submittedBy || 'Anonymous'}
- **Submitted at:** ${new Date().toISOString()}

---
*Submitted via Change Request Form*`;

    // Create labels based on type
    const labels = ['change-request'];
    if (type === 'bug') labels.push('bug');
    if (type === 'content') labels.push('content');
    if (type === 'feature') labels.push('enhancement');

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
      context.res = {
        status: response.status,
        headers,
        body: JSON.stringify({ error: `GitHub API error: ${error}` })
      };
      return;
    }

    const issue = await response.json();
    context.log('Issue created:', issue.number);

    context.res = {
      status: 201,
      headers,
      body: JSON.stringify({
        success: true,
        issueNumber: issue.number,
        issueUrl: issue.html_url
      })
    };
  } catch (error) {
    context.log('Unhandled error:', error.message, error.stack);
    context.res = {
      status: 500,
      headers,
      body: JSON.stringify({ error: `Failed to create issue: ${error.message}` })
    };
  }
};
