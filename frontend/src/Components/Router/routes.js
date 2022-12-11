import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import ForumMainPage from '../Pages/Forum/ForumMainPage';
import CoursesMainPage from '../Pages/Courses/MainPage';
import CourseOverviewPage from '../Pages/Courses/CourseOverviewPage';
import CourseSectionPage from '../Pages/Courses/CourseSectionPage';
import UserProfilePage from '../Pages/UserProfilePage';
import meowrathonHome from '../Pages/meowrathon/meowrathonHome';
import meowrathonASM from '../Pages/meowrathon/meowrathonASM';

const routes = {
  '/': HomePage,
  '/courses': CoursesMainPage,
  '/courses/overview': CourseOverviewPage,
  '/courses/course': CourseSectionPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/forum': ForumMainPage,
  '/profile': UserProfilePage,
  '/meowrathon': meowrathonHome,
  '/meowrathon/ASM': meowrathonASM,
};

export default routes;
