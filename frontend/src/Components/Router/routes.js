import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import CoursesPage from '../Pages/CoursesPage';

const routes = {
  '/': HomePage,
  '/courses': CoursesPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
};

export default routes;
