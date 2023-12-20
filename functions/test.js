// const ORGANIZATION_KV_NAMESPACE = 'Organizations'; // Replace with your KV namespace name
// const orgKV = KV_NAMESPACE.createBinding(ORGANIZATION_KV_NAMESPACE);
var MY_NAMESPACE = 'worker-Organization';


export async function onRequest(context) {
    const csvUrl = 'https://hiringassignment-545.pages.dev/general_data.csv'; 
    const csvContent = await fetch(csvUrl).then((res) => res.text());
  
    const rows = csvContent.trim().split('\n');
    // const headers = rows[0].split(',').map((header) => header.trim());
    
    // Create set of all departments
    const departmentSet = new Set();
    for (let i = 1; i < rows.length; i++)
    {
        departmentSet.add(rows[i].split(',')[1].trim());
    }

    // Create Hashmap of Departments with Manager name
    const departmentManager = new Map();
    for (let i = 1; i < rows.length; i++)
    {
        const data = rows[i].split(',');
        if(data[4].trim() === "TRUE")
        {
            departmentManager.set(data[1].trim(), data[0].trim());
        }
    }

    // Create Hashmap of Departments with Employees
    const departmentEmployees = new Map();
    for (let i = 1; i < rows.length; i++)
    {
        const data = rows[i].split(',');
        const entry = {
            "name": data[0].trim(),
            "department": data[1].trim(),
            "salary": parseInt(data[2].trim()),
            "office": data[3].trim(),
            "isManager": data[4].trim(),
            "skills": data.slice(5).map((skill) => skill.trim()),
        };
        if(departmentEmployees.has(data[1].trim()))
        {
            departmentEmployees.get(data[1].trim()).push(entry);
        }
        else
        {
            departmentEmployees.set(data[1].trim(), [entry]);
        }
    }
    let depOverallArray = []
    for (const item of departmentSet) {
        const entry = {
            "name" : item,
            "managerName" : departmentManager.get(item),
            "employees" : departmentEmployees.get(item),
        }
        depOverallArray.push(entry);
    }

    const final = {"organization" : {"departments": depOverallArray}};
    await MY_NAMESPACE.put('myKey', JSON.stringify(data))

    return new Response(JSON.stringify(final, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  