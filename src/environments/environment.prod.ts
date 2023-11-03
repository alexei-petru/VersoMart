// this file will be replaced on postbuild with set-env.mjs script
export const environment = {
  production: true,
  isInMemoryWebApi: true,
  // host url is changed for testing the build with npm run build-ssr-node command
  hostUrl: 'http://localhost:5700',
  apiUrl: '',
};
