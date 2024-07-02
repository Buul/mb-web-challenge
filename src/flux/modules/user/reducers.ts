import { Action, createReducer } from 'typesafe-actions';

import { IRequest, RequestStatus } from '@/models/iRequest';

import { clearCreateUser, createUser } from './actions';
import { Response } from './types';

const initialState: IRequest<Response> = {
  data: null,
  message: null,
  status: RequestStatus.idle,
};

const sigInReducer = createReducer<IRequest<Response>, Action>(initialState)
  .handleAction(createUser.request, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.fetching,
  }))
  .handleAction(createUser.success, (state, action) => ({
    ...state,
    data: action.payload,
    message: null,
    status: RequestStatus.success,
  }))
  .handleAction(createUser.failure, (state, action) => ({
    ...state,
    data: null,
    message: action.payload.message,
    status: RequestStatus.error,
  }))
  .handleAction(clearCreateUser, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.idle,
  }));

export default sigInReducer;
