export default defineEventHandler(async event => {
  // CORS headers
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })

  // OPTIONS preflight
  if(event.node.req.method === 'OPTIONS'){
    return new Response(null, { status: 204 })
  }
})
