import { writeFile } from 'fs';
import { getApiConfig } from './url-config'; // Assuming config.ts is at the root level

const { hostUrl, apiUrl } = getApiConfig();

const environmentFileContent = `
export const environment = {
  production: true,
  useInMemoryWebApi: false,
  hostUrl: "${hostUrl}",
  apiUrl: "${apiUrl}",
  resourceUrlInMemoryDB: '',
};
`;

const targetPath = './src/environments/environment.prod.ts';

writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    throw new Error(`Could not write environment file: ${err}`);
  }
  console.log(`Environment file written to ${targetPath}`);
});
