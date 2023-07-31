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

const routes = [
    {
        path: '/w-login',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/w-signup',
        name: 'SignupForm',
        component: SignupCheckout
    },
    {
        path: '/welcome',
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
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
