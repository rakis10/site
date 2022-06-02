import {createRouter, createWebHistory} from 'vue-router'
import About from "@/views/About";
import Home from "@/views/Home";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Register from "../views/Register";
import store from "../store";
import Zasoby from "../views/Zasoby";



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    }, {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresGuest: true
        }
    },{
        path: '/zasoby',
        name: 'Zasoby',
        component: Zasoby,
        meta: {
            requiresAuth: true
        }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            // Redirect to the Login Page
            next('/login');
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.isLoggedIn) {
            // Redirect to the Login Page
            next('/profile');
        } else {
            next();
        }
    } else {
        next()
    }
});

export default router