import { SignInValidResponse, SignUpFormValues } from '@app/core/models/types';
import { RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { USERS_DB } from '../db/users-db';
import { API_RESPONSE_MESSAGES } from '@app/core/models/constants';

export interface SignInRequest {
  accessToken: string | null;
  email: string | null;
  id: number | null;
  roles: ['user'] | null;
  name: string | null;
}

export const apiSignUp = (reqInfo: RequestInfo) => {
  // Retrieve the request body.

  const body: SignUpFormValues | object = reqInfo.utils.getJsonBody(reqInfo.req) || {};
  const errorsMsg: string[] = [];

  if ('email' in body && 'password' in body) {
    // Validate password length if password exists.
    if (body.password) {
      if (body.password.length < 8 || !body.password) {
        errorsMsg.unshift(API_RESPONSE_MESSAGES.form.common.minLength);
      }
      if (body.password.length > 50) {
        errorsMsg.unshift(API_RESPONSE_MESSAGES.form.common.maxLength);
      }
      // Validate that password contains a digit.
      if (!/\d/.test(body.password)) {
        errorsMsg.unshift(API_RESPONSE_MESSAGES.form.password.noDigit);
      }

      // if (body.)) {
      //   errors.unshift('Password should contain a digit');
      // }
    } else {
      errorsMsg.unshift(API_RESPONSE_MESSAGES.form.common.required);
    }

    if (body.email) {
      const emailRegex = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      );
      const isEmailValid = emailRegex.test(body.email);
      console.log('\x1b[35m%s\x1b[0m', `api-sign-up H19:20 L44: 'isEmailValid'`, isEmailValid);
      if (!isEmailValid) {
        errorsMsg.unshift(API_RESPONSE_MESSAGES.common.invalid);
      }

      const emailExist = USERS_DB.find((value) => value.email === body.email);
      if (emailExist) {
        errorsMsg.unshift(API_RESPONSE_MESSAGES.form.email.emailExist);
      }
    } else {
      errorsMsg.unshift(API_RESPONSE_MESSAGES.common.invalid);
    }

    // If there are validation errors, return them.
    if (errorsMsg.length > 0) {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.BAD_REQUEST, // 400 status code
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
    status: STATUS.OK, // 200 status code
    headers: reqInfo.headers,
    url: reqInfo.url,
    body: USERS_DB, // Your original response
  }));
};
