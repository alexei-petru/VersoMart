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
