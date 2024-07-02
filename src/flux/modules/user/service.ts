import { post } from '@/apis';

import { UserRequest } from './types';

export const create = (data: UserRequest) =>
  post({
    url: '/user/',
    data,
  });
