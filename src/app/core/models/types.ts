interface NestedObject {
  [key: string]: string | NestedObject;
}

export interface Translations {
  lang: string;
  keys: {
    [key: string]: string | NestedObject;
  };
  _id?: string;
}

export type TranslationsKeys = { [key: string]: string | NestedObject };
export interface SnackbarData {
  message: string;
  closeMsg: string;
}

// auth
export interface SignInValidResponse {
  accessToken: string;
  email: string;
  id: string;
  roles: ['admin' | 'user'];
  name: string;
}

export interface SignUpFormValues {
  email: string | null;
  password: string | null;
  termsAndPrivacy: boolean | null;
  newsletter: boolean | null;
}
