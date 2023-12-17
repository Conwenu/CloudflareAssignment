const csvFilePath = '../general_data.csv'; // Replace with your CSV file path
const csv = require('csvtojson');

export function onRequest(context) {
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        const jsonData = JSON.stringify(jsonObj, null, 2);
        // Respond with JSON data
        // res.json(jsonObj);
        return new Response(jsonObj)
      })
      .catch((err) => {
        console.error(err);
        return new Response('Internal Server Error')
      });
   
}