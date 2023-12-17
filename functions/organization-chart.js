addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
  });
  
  export async function handleRequest(request) {
    const csvUrl = 'https://hiringassignment-545.pages.dev/general_data.csv'; // Replace with your CSV file URL
    const csvContent = await fetch(csvUrl).then((res) => res.text());
  
    const rows = csvContent.trim().split('\n');
    const headers = rows[0].split(',').map((header) => header.trim());
    
    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {
      const data = rows[i].split(',');
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[j].trim();
      }
      jsonData.push(obj);
    }
  
    return new Response(JSON.stringify(jsonData, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  