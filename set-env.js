const fs = require('fs');


const targetPathDev = './src/app/environments/environment.ts'; 

const backendUrl = process.env.URL_BACKEND || 'http://localhost:8080/api/v1';

const envConfigFileDev = `
export const environment = {
  production: false, 
  apiUrl: '${backendUrl}'
};
`;

fs.writeFileSync(targetPathDev, envConfigFileDev); 

console.log(`environment.ts generados con apiUrl=${backendUrl}`);