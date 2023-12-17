export async function onRequest(context) {
    const csvUrl = 'https://hiringassignment-545.pages.dev/general_data.csv'; // Replace with your CSV file URL
    const csvContent = await fetch(csvUrl).then((res) => res.text());
  
    const rows = csvContent.trim().split('\n');
    const headers = rows[0].split(',').map((header) => header.trim());
    
    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {
      const data = rows[i].split(',');
      const entry = {
        name: data[0].trim(),
        department: data[1].trim(),
        salary: parseInt(data[2].trim()),
        office: data[3].trim(),
        isManager: data[4].trim(),
        skills: data.slice(5).map((skill) => skill.trim()),
      };
      jsonData.push(entry);
    }
  
    return new Response(JSON.stringify(jsonData, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  