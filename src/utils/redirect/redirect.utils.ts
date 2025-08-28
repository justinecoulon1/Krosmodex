import { redirect } from '@tanstack/react-router';
import { getLocalStorageItem } from '../local-storage/local-storage.utils';
import userService from '../api/services/user.service';

export const redirectToLoginIfNeeded = async () => {
  const user = getLocalStorageItem('user');
  if (!user) {
    return redirectTo('/auth');
  }
  try {
    await userService.getUserInfo(user.id);
  } catch {
    userService.logout();
    return redirectTo('/auth');
  }
};

const redirectTo = (path: string): never => {
  throw redirect({ to: path });
};
