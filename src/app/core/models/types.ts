import { ApiErrorsKeys, ErrorResponseType } from './constants';

interface NestedObject {
  [key: string]: string | NestedObject;
}

export interface Translations {
  lang: string;
  keys: TranslationsKeys;
  _id?: string;
}

export type TranslationsKeys = { [key: string]: string | NestedObject };
export interface SnackbarData {
  message: string;
  closeMsg: string;
}

// auth

export interface SignInFormInputs {
  email: string;
  password: string;
}

export interface GetUserResponse {
  id: string;
  email: string;
  roles: ['admin' | 'user'];
  name: string;
}

export interface SignInValidResponse extends GetUserResponse {
  accessToken?: string;
}

export interface SignUpFormInputs {
  email: string | null;
  password: string | null;
  termsAndPrivacy: boolean | null;
  newsletter: boolean | null;
}

export interface VerificationCodeRequest {
  verificationCode: string;
}

// api
export interface ApiErrorObj {
  type?: ErrorResponseType;
  errorCode?: ApiErrorsKeys;
  errorData?: { [key: string]: string };
}

export type ApiErrorsArr = ApiErrorObj[];
