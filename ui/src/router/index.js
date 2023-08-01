import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '../views/DashboardHome.vue'
import DashboardCourses from '../views/DashboardCourses.vue'
import DashboardSettings from '../views/DashboardSettings.vue'
import DashboardViewCourse from '../views/DashboardViewCourse'
import DashboardCreateCourse from '../views/DashboardCreateCourse'
import DashboardEditCourse from '../views/DashboardEditCourse'
import DashboardCreateCourseSection from '../views/DashboardCreateCourseSection'
import DashboardEditCourseSection from '../views/DashboardEditCourseSection'
import DashboardCreateSectionMaterial from '../views/DashboardCreateSectionMaterial'
import DashboardEditSectionMaterial from '../views/DashboardEditSectionMaterial'
import LoginForm from '../views/LoginForm'
import SignupCheckout from '../views/SignupCheckout'
import HomePage from '../views/HomePage'
import AboutPage from '../views/AboutPage'
import FAQPage from '../views/FAQPage'
import CourseList from '../views/CourseList'
import CourseOverview from '../views/CourseOverview'
import Signup from '@/views/Signup'
import PlatformBundles from '@/views/PlatformBundles'
import PlatformTransaction from "@/views/PlatformTransactions"
import PlatformTeachers from '@/views/PlatformTeachers'
import UserDasboard from '@/views/UserDashboard'
import LecturerCourses from '@/views/LecturerCourses'

const routes = [
    {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/checkout',
        name: 'SignupForm',
        component: SignupCheckout
    },
    {
        path: '/',
        name: 'HomeView',
        component: HomePage
    },
    {
        path: '/about-us',
        name: 'AboutUs',
        component: AboutPage
    },
    {
        path: '/FAQ',
        name: 'FAQ',
        component: FAQPage
    },
    {
        path: '/all-materials',
        name: 'MaterialsList',
        component: CourseList
    },
    {
        path: '/material',
        name: 'MaterialOverview',
        component: CourseOverview
    },
    {
        path: '/dashboard/',
        name: 'DashboardHome',
        component: DashboardHome
    },
    {
        path: '/dashboard/courses',
        name: 'Courses',
        component: DashboardCourses
    },
    {
        path: '/dashboard/settings',
        name: 'Settings',
        component: DashboardSettings
    },
    {
        path: '/dashboard/course',
        name: 'ViewCourse',
        component: DashboardViewCourse
    },
    {
        path: '/dashboard/get-course/:id',
        component: DashboardViewCourse
    },
    {
        path: '/dashboard/create-course',
        name: 'CreateCourse',
        component: DashboardCreateCourse
    },
    {
        path: '/dashboard/edit-course/:id',
        name: 'EditCourse',
        component: DashboardEditCourse
    },
    {
        path: '/dashboard/create-course-section/:courseId',
        name: 'CreateCourseSection',
        component: DashboardCreateCourseSection
    },
    {
        path: '/dashboard/edit-course-section/:sectionId',
        name: 'EditCourseSection',
        component: DashboardEditCourseSection
    },
    {
        path: '/dashboard/create-section-material/:sectionId',
        name: 'CreateSectionMaterial',
        component: DashboardCreateSectionMaterial
    },
    {
        path: '/dashboard/edit-section-material/:materialId',
        name: 'EditSectionMaterial',
        component: DashboardEditSectionMaterial
    },
    {
        path: '/dashboard/platformbundles',
        name: 'PlatformBundles',
        component: PlatformBundles
    },
    {
        path: '/dashboard/platformtransactions',
        name: 'PlatformTransaction',
        component: PlatformTransaction
    },
    {
        path: '/dashboard/platformteachers',
        name: 'PlatformTeachers',
        component: PlatformTeachers
    },
    {
        path: '/dashboard/lecturercourses',
        name: 'LecturerCourses',
        component: LecturerCourses
    },
    {
        path: '/userdashboard',
        name: 'UserDasboard',
        component: UserDasboard
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
