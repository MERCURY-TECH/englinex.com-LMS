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
import HomePage from '../views/HomePage'
import AboutPage from '../views/AboutPage'
import FAQPage from '../views/FAQPage'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginForm
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
        path: '/dashboard/edit-course-section',
        name: 'EditCourseSection',
        component: DashboardEditCourseSection
    },
    {
        path: '/dashoard/create-section-material',
        name: 'CreateSectionMaterial',
        component: DashboardCreateSectionMaterial
    },
    {
        path: '/dashoard/edit-section-material',
        name: 'EditSectionMaterial',
        component: DashboardEditSectionMaterial
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
