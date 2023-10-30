import { ERROR_RESPONSE_TYPE, API_ERRORS_KEYS } from '@app/core/models/constants';
import { HTTP_STATUS_CODES } from '@app/core/models/http-error-codes';
import { ApiErrorObj, ApiErrorsArr, VerificationCodeRequest } from '@app/core/models/types';
import { RequestInfo } from 'angular-in-memory-web-api';

const apiResonse = (reqInfo: RequestInfo, status: number, errorArr?: ApiErrorsArr) => {
  return reqInfo.utils.createResponse$(() => ({
    status: status,
    headers: reqInfo.headers,
    url: reqInfo.url,
    error: errorArr,
  }));
};

export const apiVerificationCode = (reqInfo: RequestInfo) => {
  const apiErrorArr: ApiErrorsArr = [];
  const body: VerificationCodeRequest = reqInfo.utils.getJsonBody(reqInfo.req) || {};

  if (body.verificationCode) {
    return apiResonse(reqInfo, HTTP_STATUS_CODES.SUCCESS.ACCEPTED, apiErrorArr);
  } else {
    const errorObj: ApiErrorObj = {
      type: ERROR_RESPONSE_TYPE.common,
      errorCode: API_ERRORS_KEYS.formCommonInvalidCredentials,
    };
    apiErrorArr.push(errorObj);
    return apiResonse(reqInfo, HTTP_STATUS_CODES.CLIENT_ERROR.NOT_ACCEPTABLE, apiErrorArr);
  }
};
