import { RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { USERS_DB } from '../db/users-db';
import { GetUserResponse } from '@app/core/models/types';

export const apiGetUser = (reqInfo: RequestInfo) => {
  // const errors: string[] = [];
  // let response: GetUserResponse;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers = (reqInfo.req as any).headers;
  const authorizationHeader = headers.get('Authorization');
  const receivedToken = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
  const foundUser = receivedToken
    ? USERS_DB.find((value) => value.accessToken === receivedToken)
    : null;

  if (foundUser) {
    const userToBeSend: GetUserResponse = {
      id: foundUser.id,
      email: foundUser.email,
      roles: foundUser.roles,
      name: foundUser.name,
    };

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      headers: reqInfo.headers,
      url: reqInfo.url,
      body: userToBeSend,
    }));
  }

  return reqInfo.utils.createResponse$(() => ({
    status: STATUS.UNAUTHORIZED,
    headers: reqInfo.headers,
    url: reqInfo.url,
    body: {},
  }));
};
