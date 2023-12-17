const csvFilePath = '../general_data.csv'; // Replace with your CSV file path
const csv = require('csvtojson');
const fs = require('fs');

export function onRequest(context) {
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        const jsonData = JSON.stringify(jsonObj, null, 2);
        // Respond with JSON data
        // res.json(jsonObj);
        return new Response(jsonObj)
        
        // Save JSON data to a file (optional)
        fs.writeFileSync('csv_data.json', jsonData, 'utf-8');
      })
      .catch((err) => {
        console.error(err);
        return new Response('Internal Server Error')
      });
   
}