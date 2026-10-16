// Cloud Run function behind Firebase Hosting: every /api/** request lands here
// (see the "rewrites" in firebase.json) and is routed to a handler by path.
//
// The handlers are written against the Web-standard Request (request.json(),
// request.formData(), request.headers.get()) and return { status, jsonBody },
// so this file is the only place that knows about Express.
const functions = require('@google-cloud/functions-framework');

const sendEmail = require('./handlers/sendEmail');
const createIssue = require('./handlers/createIssue');
const health = require('./handlers/health');

const routes = {
  'POST /api/send-email': sendEmail,
  'POST /api/create-issue': createIssue,
  'GET /api/health': health,
};

const context = { log: (...args) => console.log(...args) };

functions.http('api', async (req, res) => {
  // Hosting forwards the full path; a direct call to the Cloud Run URL may not
  // carry the /api prefix, so accept both.
  const path = req.path.startsWith('/api/') ? req.path : `/api${req.path}`;
  const handler = routes[`${req.method} ${path.replace(/\/$/, '')}`];
  if (!handler) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  const hasBody = !['GET', 'HEAD'].includes(req.method);
  const request = new Request(`https://${req.get('host')}${req.originalUrl}`, {
    method: req.method,
    headers: Object.entries(req.headers).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((x) => [k, x]) : [[k, v]]
    ),
    body: hasBody ? req.rawBody : undefined,
  });

  const { status = 200, jsonBody } = await handler(request, context);
  res.status(status).json(jsonBody ?? {});
});
