import axios, { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { UserError } from '@/models/errors';

import { createUser } from './actions';
import { create } from './service';
import { UserResponse } from './types';

function* createUserSaga({
  payload,
}: ReturnType<typeof createUser.request>): Generator {
  try {
    const response: UserResponse = (yield call(
      create,
      payload
    )) as UserResponse;
    yield put(createUser.success(response.data));
  } catch (err) {
    const sanitizedError: AxiosError<UserError> = new AxiosError();
    if (axios.isAxiosError(err)) {
      const errorData = (err as AxiosError<UserError>).response?.data.errors;
      if (errorData?.length) {
        sanitizedError.message = errorData[0].msg;
      }
    }
    yield put(createUser.failure(sanitizedError));
  }
}

export default [takeEvery(createUser.request, createUserSaga)];
