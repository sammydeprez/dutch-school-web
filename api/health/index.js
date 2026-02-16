module.exports = async function (context, req) {
  context.log('Health check invoked');

  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      nodeVersion: process.version
    })
  };
};
