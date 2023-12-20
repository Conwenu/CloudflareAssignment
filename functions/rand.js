addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    let value = await worker_MY_KV_preview.get('myKey')
    return new Response(value)
  }