import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { Response, UserRequest } from './types';

export const createUser = createAsyncAction(
  'CREATE_USER_REQUEST',
  'CREATE_USER_SUCCESS',
  'CREATE_USER_ERROR'
)<UserRequest, Response, Error | AxiosError>();

export const clearCreateUser = createAction('CLEAR_CREATE_USER')();
