import { createRouter, createWebHistory } from "vue-router";
import DashboardViewCourse from "@/views/course-management/DashboardViewCourse";
import HomePage from "@/views/HomePage";

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

const routes = [
    {
        path: "/checkOut",
        name: "CheckOut",
        component: () => import("@/views/CheckOutPage"),
    },
    {
        path: "/",
        name: "HomeView",
        component: HomePage,
    },
    {
        path: "/about-us",
        name: "AboutUs",
        component: () => import("@/views/AboutPage"),
    },
    {
        path: "/FAQ",
        name: "FAQ",
        component: () => import("@/views/FAQPage"),
    },
    {
        path: "/all-materials",
        name: "MaterialsList",
        component: () => import("@/views/CourseList"),
    },
    {
        path: "/course/:courseId",
        name: "MaterialOverview",
        component: ()=>import('@/views/CourseOverview'),
    },
    {
        path: "/admin",
        name: "DashboardHome",
        component: ()=>import("@/views/DashboardHome.vue"),
    },
    {
        path: "/admin/dashboard/courses",
        name: "Courses",
        component: ()=>import("@/views/course-management/DashboardCourses.vue"),
    },
    {
        path: "/admin/dashboard/settings",
        name: "Settings",
        component: ()=>import("@/views/DashboardSettings.vue"),
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
        component: ()=>import('@/views/course-management/DashboardCreateCourse'),
    },
    {
        path: "/admin/dashboard/edit-course/:id",
        name: "EditCourse",
        component: ()=>import('@/views/course-management/DashboardEditCourse'),
    },
    {
        path: "/admin/dashboard/create-course-section/:courseId",
        name: "CreateCourseSection",
        component: ()=>import('@/views/course-management/DashboardCreateCourseSection'),
    },
    {
        path: "/admin/dashboard/edit-course-section/:sectionId",
        name: "EditCourseSection",
        component: ()=>import('@/views/course-management/DashboardEditCourseSection'),
    },
    {
        path: "/admin/dashboard/create-section-material/:sectionId",
        name: "CreateSectionMaterial",
        component: ()=>import('@/views/course-management/DashboardCreateSectionMaterial'),
    },
    {
        path: "/admin/dashboard/edit-section-material/:materialId",
        name: "EditSectionMaterial",
        component: ()=>import('@/views/course-management/DashboardEditSectionMaterial'),
    },
    {
        path: "/admin/dashboard/platformbundles",
        name: "PlatformBundles",
        component: ()=>import('@/views/PlatformBundles'),
    },
    {
        path: "/admin/dashboard/platformtransactions",
        name: "PlatformTransaction",
        component: ()=>import('@/views/PlatformTransactions'),
    },
    {
        path: "/admin/dashboard/platformteachers",
        name: "PlatformTeachers",
        component: ()=>import('@/views/PlatformTeachers'),
    },
    {
        path: "/admin/dashboard/lecturercourses/:lecturerId",
        name: "LecturerCourses",
        component: ()=>import("@/views/course-management/LecturerCourses"),
    },
    {
        path: "/admin/dashboard/studentlist",
        name: "StudentList",
        component: ()=>import('@/views/StudentList'),
    },
    {
        path: "/admin/dashboard/schedule-management",
        name: "ScheduleManagement",
        component: ()=>import('@/views/ScheduleManagement'),
    },
    {
        path: "/userdashboard",
        name: "UserDasboard",
        component: ()=>import("@/views/account-management/UserDashboard.vue"),
    },
    {
        path: "/waitingscreen",
        name: "WaitingsCreen",
        component: ()=>import('@/views/live-class/WaitingScreen.vue'),
    },
    {
        path: "/liveclass",
        name: "LiveClass",
        component: ()=>import('@/views/live-class/Liveclass.vue'),
    },
    {
        path: "/bundles",
        name: "BundlesPage",
        component: ()=>import('@/views/BundlesPage'),
    },
    {
        path: "/auth",
        name: "LoginSignUpPage",
        component: ()=>import('@/views/auth/LoginSignUpPage'),
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
