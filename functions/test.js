export async function onRequest(context) {
    const csvUrl = 'https://hiringassignment-545.pages.dev/general_data.csv'; // Replace with your CSV file URL
    const csvContent = await fetch(csvUrl).then((res) => res.text());
  
    const rows = csvContent.trim().split('\n');
    const headers = rows[0].split(',').map((header) => header.trim());
    
    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {
      const data = rows[i].split(',');
      const obj = {};
      const entry = {
        name: data[0].trim(),
        age: parseInt(data[1].trim()),
        salary: parseInt(data[2].trim()),
        skills: data.slice(3).map((skill) => skill.trim()),
      };
      for (let j = 0; j < headers.length; j++) {
        // obj[headers[j]] = data[j].trim();
        obj[headers[j]] = entry;
      }
      jsonData.push(obj);
    }
  
    return new Response(JSON.stringify(jsonData, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  