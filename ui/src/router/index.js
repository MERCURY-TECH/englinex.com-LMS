import { createRouter, createWebHistory } from "vue-router";
import DashboardHome from "../views/DashboardHome.vue";
import DashboardCourses from "../views/DashboardCourses.vue";
import DashboardSettings from "../views/DashboardSettings.vue";
import DashboardViewCourse from "../views/DashboardViewCourse";
import DashboardCreateCourse from "../views/DashboardCreateCourse";
import DashboardEditCourse from "../views/DashboardEditCourse";
import DashboardCreateCourseSection from "../views/DashboardCreateCourseSection";
import DashboardEditCourseSection from "../views/DashboardEditCourseSection";
import DashboardCreateSectionMaterial from "../views/DashboardCreateSectionMaterial";
import DashboardEditSectionMaterial from "../views/DashboardEditSectionMaterial";
// import LoginForm from '../views/LoginForm'

import HomePage from "../views/HomePage";
import CourseOverview from "../views/CourseOverview";
// import Signup from '@/views/Signup'
import PlatformBundles from "@/views/PlatformBundles";
import PlatformTransaction from "@/views/PlatformTransactions";
import PlatformTeachers from "@/views/PlatformTeachers";
import UserDasboard from "@/views/UserDashboard";
import LecturerCourses from "@/views/LecturerCourses";
import LoginSignUpPage from "@/views/auth/LoginSignUpPage";
import StudentList from "@/views/StudentList";
import WaitingsCreen from '@/views/WaitingScreen.vue'
// import {parseJwt} from '../helpers'
const http404 = {
    template: "<div>http404 path is : {{$route.path}}</div>",
    mounted() {
        console.log(this.$route.path);
        this.$parent.title = "http404 Page";
    },
};

// function beforeRouteEnter (to, from, next) {
//     if (localStorage.token) {
//       const jwtPayload = parseJwt(localStorage.token);
//       if (jwtPayload.exp < Date.now()/1000) {
//           // token expired
//           deleteTokenFromLocalStorage();
//           next("/");
//       }
//       next();
//     } else {
//       next("/");
//     }
//   }

const routes = [
    {
        path: "/checkout",
        name: "SignupForm",
        component: () => import("../views/SignupCheckout"),
    },
    {
        path: "/",
        name: "HomeView",
        component: HomePage,
    },
    {
        path: "/about-us",
        name: "AboutUs",
        component: () => import("../views/AboutPage"),
    },
    {
        path: "/FAQ",
        name: "FAQ",
        component: () => import("../views/FAQPage"),
    },
    {
        path: "/all-materials",
        name: "MaterialsList",
        component: () => import("../views/CourseList"),
    },
    {
        path: "/material",
        name: "MaterialOverview",
        component: CourseOverview,
    },
    {
        path: "/admin",
        name: "DashboardHome",
        component: DashboardHome,
    },
    {
        path: "/admin/dashboard/courses",
        name: "Courses",
        component: DashboardCourses,
    },
    {
        path: "/admin/dashboard/settings",
        name: "Settings",
        component: DashboardSettings,
    },
    {
        path: "/admin/dashboard/course",
        name: "ViewCourse",
        component: DashboardViewCourse,
    },
    {
        path: "/admin/dashboard/get-course/:id",
        component: DashboardViewCourse,
    },
    {
        path: "/admin/dashboard/create-course",
        name: "CreateCourse",
        component: DashboardCreateCourse,
    },
    {
        path: "/admin/dashboard/edit-course/:id",
        name: "EditCourse",
        component: DashboardEditCourse,
    },
    {
        path: "/admin/dashboard/create-course-section/:courseId",
        name: "CreateCourseSection",
        component: DashboardCreateCourseSection,
    },
    {
        path: "/admin/dashboard/edit-course-section/:sectionId",
        name: "EditCourseSection",
        component: DashboardEditCourseSection,
    },
    {
        path: "/admin/dashboard/create-section-material/:sectionId",
        name: "CreateSectionMaterial",
        component: DashboardCreateSectionMaterial,
    },
    {
        path: "/admin/dashboard/edit-section-material/:materialId",
        name: "EditSectionMaterial",
        component: DashboardEditSectionMaterial,
    },
    {
        path: "/admin/dashboard/platformbundles",
        name: "PlatformBundles",
        component: PlatformBundles,
    },
    {
        path: "/admin/dashboard/platformtransactions",
        name: "PlatformTransaction",
        component: PlatformTransaction,
    },
    {
        path: "/admin/dashboard/platformteachers",
        name: "PlatformTeachers",
        component: PlatformTeachers,
    },
    {
        path: "/admin/dashboard/lecturercourses",
        name: "LecturerCourses",
        component: LecturerCourses,
    },
    {
        path: "/admin/dashboard/studentlist",
        name: "StudentList",
        component: StudentList,
    },
    {
        path: "/userdashboard",
        name: "UserDasboard",
        component: UserDasboard,
    },
    {
        path: "/waitingscreen",
        name: "WaitingsCreen",
        component: WaitingsCreen,
    },
    {
        path: "/auth",
        name: "LoginSignUpPage",
        component: LoginSignUpPage,
    },
    {
        path: "/**/",
        name: "404FallBack",
        component: http404,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
