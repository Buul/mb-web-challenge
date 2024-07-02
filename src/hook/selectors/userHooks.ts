import { useSelector } from '@/flux/selector';
import { RootState } from '@/flux/store';

export const useCreateUser = () =>
  useSelector((state: RootState) => state.user);
