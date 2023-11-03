import { environment } from 'src/environments/environment';

const getHerokuUrl = () => {
  const herokuUrlName = process.env.HEROKU_APP_NAME;
  if (herokuUrlName) {
    const herokuUrl = 'https://' + herokuUrlName + '.herokuapp.com/';
    return herokuUrl;
  }
  return null;
};

export const getApiConfig = () => ({
  hostUrl: getHerokuUrl() || '',
  apiUrl: environment.isInMemoryWebApi ? getHerokuUrl() || '' : process.env.API_HOST_URL,
});
