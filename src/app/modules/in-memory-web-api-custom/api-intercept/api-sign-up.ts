import { ERROR_RESPONSE_TYPE, API_ERRORS_KEYS } from '@app/core/models/constants';
import { HTTP_STATUS_CODES } from '@app/core/models/http-error-codes';
import { ApiErrorsArr, ApiErrorObj, SignUpFormInputs } from '@app/core/models/types';
import { USERS_DB, USERS_DB_LAST_ID, UserDB } from '../db/users-db';
import { RequestInfo } from 'angular-in-memory-web-api';

const apiResonse = (reqInfo: RequestInfo, status: number, errorArr?: ApiErrorsArr) => {
  return reqInfo.utils.createResponse$(() => ({
    status: status,
    headers: reqInfo.headers,
    url: reqInfo.url,
    error: errorArr,
  }));
};

export const apiSignUp = (reqInfo: RequestInfo) => {
  const apiErrorArr: ApiErrorsArr = [];
  const body: SignUpFormInputs = reqInfo.utils.getJsonBody(reqInfo.req) || {};

  const foundUser = USERS_DB.find((value) => value.email === body.email);

  if (foundUser) {
    const errorObj: ApiErrorObj = {
      type: ERROR_RESPONSE_TYPE.common,
      errorCode: API_ERRORS_KEYS.emailExist,
    };
    return apiResonse(reqInfo, HTTP_STATUS_CODES.CLIENT_ERROR.CONFLICT, [errorObj]);
  }

  const errorArr = validateInputs(body);
  apiErrorArr.push(...errorArr);

  if (apiErrorArr.length) {
    return apiResonse(reqInfo, HTTP_STATUS_CODES.CLIENT_ERROR.CONFLICT, apiErrorArr);
  }

  if (!apiErrorArr.length) {
    addNewUserToDb(body);
    return apiResonse(reqInfo, HTTP_STATUS_CODES.SUCCESS.ACCEPTED, undefined);
  }

  const defaultErrorObj: ApiErrorObj = {
    type: ERROR_RESPONSE_TYPE.common,
    errorCode: API_ERRORS_KEYS.sharedSomethingWrong,
  };
  return apiResonse(reqInfo, HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST, [defaultErrorObj]);
};

const validateInputs = (body: SignUpFormInputs): ApiErrorsArr => {
  const apiErrorArr: ApiErrorsArr = [];

  if (body.password) {
    const passwordPattern = /^(?=.*\d).{8,50}$/;
    const pswIsValid = passwordPattern.test(body.password);
    if (!pswIsValid) {
      apiErrorArr.push({
        type: ERROR_RESPONSE_TYPE.common,
        errorCode: API_ERRORS_KEYS.passwordInvalid,
      });
    }
  } else {
    apiErrorArr.push({
      type: ERROR_RESPONSE_TYPE.common,
      errorCode: API_ERRORS_KEYS.passwordRequired,
    });
  }

  if (body.email) {
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    );
    const isEmailValid = emailRegex.test(body.email);
    if (!isEmailValid) {
      apiErrorArr.push({
        type: ERROR_RESPONSE_TYPE.common,
        errorCode: API_ERRORS_KEYS.emailInvalid,
      });
    }
  } else {
    apiErrorArr.push({
      type: ERROR_RESPONSE_TYPE.common,
      errorCode: API_ERRORS_KEYS.emailRequired,
    });
  }

  if (!body.termsAndPrivacy) {
    apiErrorArr.push({
      type: ERROR_RESPONSE_TYPE.common,
      errorCode: API_ERRORS_KEYS.termsAndPrivacyRequired,
    });
  }

  return apiErrorArr;
};

const addNewUserToDb = (body: SignUpFormInputs) => {
  const { password, email } = body;
  if (password && email) {
    const newUserData: UserDB = {
      id: (USERS_DB_LAST_ID + 1).toString(),
      accessToken: email + email.slice(0, email.indexOf('@')),
      password: password,
      name: email.slice(0, email.indexOf('@')),
      email: email,
      roles: ['user'],
    };
    USERS_DB.push(newUserData);
  }
};
