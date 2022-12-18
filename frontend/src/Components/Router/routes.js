import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import ForumMainPage from '../Pages/Forum/ForumMainPage';
import ForumNewThreadPage from '../Pages/Forum/ForumNewThreadPage';
import ForumThreadPage from '../Pages/Forum/ForumThreadPage';
import CoursesMainPage from '../Pages/Courses/MainPage';
import CourseOverviewPage from '../Pages/Courses/CourseOverviewPage';
import CourseSectionPage from '../Pages/Courses/CourseSectionPage';
import UserProfilePage from '../Pages/UserProfilePage';
import meowrathonHome from '../Pages/meowrathon/meowrathonHome';
import meowrathonASM from '../Pages/meowrathon/meowrathonASM';
import LeaderboardPage from '../Pages/LeaderboardPage';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/courses': CoursesMainPage,
  '/courses/overview': CourseOverviewPage,
  '/courses/course': CourseSectionPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/forum': ForumMainPage,
  '/forum/new': ForumNewThreadPage,
  '/forum/thread': ForumThreadPage,
  '/profile': UserProfilePage,
  '/meowrathon': meowrathonHome,
  '/meowrathon/ASM': meowrathonASM,
  '/leaderboard': LeaderboardPage,
};

export default routes;
