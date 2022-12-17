// eslint-disable-next-line import/no-cycle
import Navbar from '../Components/Navbar/Navbar';

const STORE_USER = 'user';
const STORE_REMEMBER = 'remember';
let currentUser;

const clearAuthenticatedUser = () => {
  localStorage.removeItem(STORE_USER);
  sessionStorage.removeItem(STORE_USER);

  localStorage.removeItem(STORE_REMEMBER);
  currentUser = undefined;
};

const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;

  const serializedUser = localStorage.getItem(STORE_USER) ?? sessionStorage.getItem(STORE_USER);
  if (!serializedUser) return undefined;

  currentUser = JSON.parse(serializedUser);
  return currentUser;
};

const setAuthenticatedUser = (authenticatedUser, remember = false) => {
  clearAuthenticatedUser();

  const serializedUser = JSON.stringify(authenticatedUser);
  (remember ? localStorage : sessionStorage).setItem(STORE_USER, serializedUser);
  localStorage.setItem(STORE_REMEMBER, remember);

  currentUser = authenticatedUser;

  Navbar();
};

const isAuthenticated = () => currentUser !== undefined || getAuthenticatedUser() !== undefined;

const getRememberMe = () => sessionStorage.getItem('remember') === 'true';

export {
  getAuthenticatedUser,
  setAuthenticatedUser,
  isAuthenticated,
  clearAuthenticatedUser,
  getRememberMe,
};
