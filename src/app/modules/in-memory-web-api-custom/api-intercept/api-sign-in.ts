import { API_ERRORS_KEYS, ERROR_RESPONSE_TYPE } from '@app/core/models/constants';
import { HTTP_STATUS_CODES } from '@app/core/models/http-error-codes';
import { ApiErrorObj, ApiErrorsArr, SignInValidResponse } from '@app/core/models/types';
import { RequestInfo } from 'angular-in-memory-web-api';
import { USERS_DB } from '../db/users-db';

const apiResonse = (
  reqInfo: RequestInfo,
  status: number,
  response?: SignInValidResponse,
  errorArr?: ApiErrorsArr,
) => {
  return reqInfo.utils.createResponse$(() => ({
    status: status,
    headers: reqInfo.headers,
    url: reqInfo.url,
    body: response,
    error: errorArr,
  }));
};

export const apiSignIn = (reqInfo: RequestInfo) => {
  let signInValidResponse: SignInValidResponse;
  const apiErrorArr: ApiErrorsArr = [];
  const body: { email?: string; password?: string } = reqInfo.utils.getJsonBody(reqInfo.req) || {};

  const email = body.email;
  const password = body.password;
  const foundUser = USERS_DB.find((value) => value.email === email && value.password === password);

  if (!foundUser) {
    const errorObj: ApiErrorObj = {
      type: ERROR_RESPONSE_TYPE.common,
      errorCode: API_ERRORS_KEYS.formCommonInvalidCredentials,
    };
    apiErrorArr.push(errorObj);
  }

  if (apiErrorArr.length) {
    return apiResonse(reqInfo, HTTP_STATUS_CODES.CLIENT_ERROR.CONFLICT, undefined, apiErrorArr);
  }

  if (foundUser) {
    signInValidResponse = {
      accessToken: foundUser.accessToken,
      id: foundUser.id,
      email: foundUser.email,
      roles: foundUser.roles,
      name: foundUser.name,
    };
    return apiResonse(reqInfo, HTTP_STATUS_CODES.SUCCESS.OK, signInValidResponse);
  }

  const defaultErrorObj: ApiErrorObj = {
    type: ERROR_RESPONSE_TYPE.common,
    errorCode: API_ERRORS_KEYS.sharedSomethingWrong,
  };
  return apiResonse(reqInfo, HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST, undefined, [
    defaultErrorObj,
  ]);
};
