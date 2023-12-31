import { writeFile } from 'fs';

const getHerokuUrl = () => {
  const herokuUrlName = process.env['HEROKU_APP_NAME'];
  if (herokuUrlName) {
    const herokuUrl = 'https://' + herokuUrlName + '.herokuapp.com';
    return herokuUrl;
  }
  return null;
};

export const getApiConfig = () => ({
  hostUrl: getHerokuUrl() || '',
  apiUrl: process.env['SERVER_API_URL'] || '',
});

const { hostUrl, apiUrl } = getApiConfig();

const environmentFileContent = `
export const environment = {
  production: true,
  isInMemoryWebApi: true,
  hostUrl:'${hostUrl}',
  apiUrl: '${apiUrl}',
};
`;

const targetPath = 'src/environments/environment.prod.ts';

writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    throw new Error(`Could not write environment file: ${err}`);
  }
  console.log(`Environment file written to ${targetPath}`);
  console.log(`Environment file content ${environmentFileContent}`);
});
