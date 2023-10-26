import { RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { USERS_DB } from '../db/users-db';
import { GetUserResponse, SignInValidResponse } from '@app/core/models/types';

export const apiSignIn = (reqInfo: RequestInfo) => {
  let response: SignInValidResponse;
  // Retrieve the request body.
  const body: { email?: string; password?: string } | object =
    reqInfo.utils.getJsonBody(reqInfo.req) || {};
  const errorsMsg: string[] = [];

  if ('email' in body && 'password' in body) {
    const email = body.email;
    const password = body.password;
    const foundUser = USERS_DB.find(
      (value) => value.email === email && value.password === password,
    );

    if (!foundUser) {
      errorsMsg.unshift('Invalid credential');
    }

    if (foundUser) {
      response = {
        accessToken: foundUser.accessToken,
        id: foundUser.id,
        email: foundUser.email,
        roles: foundUser.roles,
        name: foundUser.name,
      };
    }

    if (errorsMsg.length) {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.BAD_REQUEST,
        headers: reqInfo.headers,
        url: reqInfo.url,
        body: {},
        error: {
          message: errorsMsg,
        },
      }));
    }
  }

  // Otherwise, proceed with successful authentication.
  return reqInfo.utils.createResponse$(() => ({
    status: STATUS.OK,
    headers: reqInfo.headers,
    url: reqInfo.url,
    body: response,
  }));
};
