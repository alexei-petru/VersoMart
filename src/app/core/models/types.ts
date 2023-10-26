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

export interface GetUserResponse {
  id: string;
  email: string;
  roles: ['admin' | 'user'];
  name: string;
}
export interface SignInValidResponse extends GetUserResponse {
  accessToken?: string;
}

export interface SignUpFormValues {
  email: string | null;
  password: string | null;
  termsAndPrivacy: boolean | null;
  newsletter: boolean | null;
}
