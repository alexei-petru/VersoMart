import { GetUserResponse } from '@app/core/models/types';
import { InMemoryCookieReceived } from '@app/modules/in-memory-web-api-custom/in-mem-custom.service';
import { RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { USERS_DB } from '../db/users-db';

export const apiGetUser = (reqInfo: RequestInfo, cookieReceived: InMemoryCookieReceived) => {
  const accesTokenCookie = cookieReceived?.accessToken;
  const foundUser = accesTokenCookie
    ? USERS_DB.find((value) => {
        return value.accessToken === accesTokenCookie;
      })
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
