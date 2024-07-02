export type GenericError = {
  code: string;
  fields?: { [field: string]: string };
  message: string;
  type: string;
};

export enum GenericErrorType {
  NoResponseException = 'NoResponseException',
  Request404 = 'Request failed with status code 404',
  Request401 = 'Request failed with status code 401',
}

export enum ErrorType {
  EMAIL_EMPTY = 'Email does not Empty',
  INVALID_EMAIL = 'Invalid email',
  PASSWORD_EMPTY = 'Password does not Empty',
  INVALID_BIRTHDATE = 'Invalid birthday',
  INVALID_ORIGINDATE = 'Invalid originDate',
  INVALID_CPF = 'Invalid cpf',
  INVALID_CNPJ = 'Invalid cnpj',
}

export enum SanitizeError {
  EMPTY_MESSAGE = 'Campo obrigatório.',
  INVALID_EMAIL_MESSAGE = 'Email incorreto.',
  INVALID_DATE_MESSAGE = 'Data inválida.',
  INVALID_CPF_MESSAGE = 'CPF inválido.',
  INVALID_CNPJ_MESSAGE = 'CNPJ inválido.',
}

export type CustomError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export interface UserError {
  errors: CustomError[];
}
