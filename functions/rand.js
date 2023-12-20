addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    let value = await MYKV.get('myKey')
    return new Response(value)
  }