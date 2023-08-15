import { createRouter, createWebHistory } from "vue-router";
import DashboardViewCourse from "../views/course-management/DashboardViewCourse";
import DashboardCreateCourse from "../views/course-management/DashboardCreateCourse";
import DashboardEditCourse from "../views/course-management/DashboardEditCourse";
import DashboardCreateCourseSection from "../views/course-management/DashboardCreateCourseSection";
import DashboardEditCourseSection from "../views/course-management/DashboardEditCourseSection";
import DashboardCreateSectionMaterial from "../views/course-management/DashboardCreateSectionMaterial";
import DashboardEditSectionMaterial from "../views/course-management/DashboardEditSectionMaterial";
import HomePage from "../views/HomePage";
import PlatformBundles from "@/views/PlatformBundles";
import PlatformTransaction from "@/views/PlatformTransactions";
import PlatformTeachers from "@/views/PlatformTeachers";

import LoginSignUpPage from "@/views/auth/LoginSignUpPage";
import StudentList from "@/views/StudentList";
import WaitingsCreen from '@/views/WaitingScreen.vue'
import LiveClass from '@/views/Liveclass.vue'
import BundlesPage from '@/views/Bundles'
import ScheduleManagement from '@/views/ScheduleManagement'
// import {parseJwt} from '../helpers'

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
// DashboardCourses

const routes = [
    {
        path: "/checkOut",
        name: "CheckOut",
        component: () => import("../views/CheckOutPage"),
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
        path: "/course/:courseId",
        name: "MaterialOverview",
        component: ()=>import('../views/CourseOverview'),
    },
    {
        path: "/admin",
        name: "DashboardHome",
        component: ()=>import("../views/DashboardHome.vue"),
    },
    {
        path: "/admin/dashboard/courses",
        name: "Courses",
        component: ()=>import("../views/course-management/DashboardCourses.vue"),
    },
    {
        path: "/admin/dashboard/settings",
        name: "Settings",
        component: ()=>import("../views/DashboardSettings.vue"),
    },
    {
        path: "/admin/dashboard/course",
        name: "ViewCourse",
        component: DashboardViewCourse,
    },
    {
        path: "/admin/dashboard/get-course/:id",
		name:"GetSingleCourse",
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
        component: ()=>import("@/views/course-management/LecturerCourses"),
    },
    {
        path: "/admin/dashboard/studentlist",
        name: "StudentList",
        component: StudentList,
    },
    {
        path: "/admin/dashboard/schedule-management",
        name: "ScheduleManagement",
        component: ScheduleManagement,
    },
    {
        path: "/userdashboard",
        name: "UserDasboard",
        component: ()=>import("@/views/account-management/UserDashboard.vue"),
    },
    {
        path: "/waitingscreen",
        name: "WaitingsCreen",
        component: WaitingsCreen,
    },
    {
        path: "/liveclass",
        name: "LiveClass",
        component: LiveClass,
    },
    {
        path: "/bundles",
        name: "BundlesPage",
        component: BundlesPage,
    },
    {
        path: "/auth",
        name: "LoginSignUpPage",
        component: LoginSignUpPage,
    },
    
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: ()=>import("@/views/fallback/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
