import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import ForumPage from '../Pages/ForumPage';
import CoursesPage from '../Pages/CoursesPage';
import UserProfilePage from '../Pages/UserProfilePage';
import LangageCPage from '../Pages/LangageCPage';
import AsmPage from '../Pages/AsmPage';

const routes = {
  '/': HomePage,
  '/courses': CoursesPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/forum': ForumPage,
  '/profile': UserProfilePage,
  '/Cfacile': LangageCPage,
  '/asm': AsmPage,
};

export default routes;
