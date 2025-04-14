import { useUserStore } from '@/entities/user/model/useUserStore';

export const QUERY_KEYS = {
  user: {
    base: ['user'] as const,
  },
};

export const createQueryKey = (entity: string, ...args: unknown[]) => {
  const userId = useUserStore.getState().userId;
  return [userId, entity, ...args];
};
