addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    let value = await MY_KV.get('myKey')
    return new Response(value)
  }