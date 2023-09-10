export interface Translations {
  lang: string;
  keys: {
    [key: string]: string;
  };
  _id?: string;
}

export interface SnackbarData {
  message: string;
  closeMsg: string;
}
