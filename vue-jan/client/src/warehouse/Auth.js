import axios from 'axios';
import router from '../router';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null,
    zasoby: [],
    hrubky: [],
    dlzky: [],
    zmaz: {}
};

const getters = {
    // isLoggedIn: function (state) {
    //     if (state.token != '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error,
    dlzky: state => state.dlzky,
    hrubky: state => state.hrubky,
    zmaz: state =>state.zmaz,
    zasoby_list: state =>state.zasoby ,
};

const actions = {
    // Login Action
    async login({
                    commit
                }, user) {
        commit('auth_request');
        try {
            // dev
            let res = await axios.post('http://localhost:3000/api/users/login', user)
            // deploy
            // let res = await axios.post('/api/users/login', user)


            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
                       commit
                   }, userData) {
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:3000/api/users/register', userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // Get the user Profile
    async getProfile({
                         commit
                     }) {
        commit('profile_request');
        let res = await axios.get('http://localhost:3000/api/users/profile')
        commit('user_profile', res.data.user)
        return res;
    },
    // Logout the user
    async logout({
                     commit
                 }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    },
    // Get
    async getZasoby({
                         commit
                     }) {
        // commit('profile_request');
        let res = await axios.get('http://localhost:3000/api/zasoby')
        // posli do mutacie ZASOBY LIST data z BE
        commit('zasoby_list', res.data)
        return res;
    },
    // Get the user Profile
    async getHrubka({
                        commit
                    }) {
        // commit('profile_request');
        let res = await axios.get('http://localhost:3000/api/zasoby/hrubka')
        commit('hrubky', res.data)
        return res;
    },
    async getDlzky({
                       commit
                   }) {
        // commit('profile_request');
        let res = await axios.get('http://localhost:3000/api/zasoby/dlzka')
        commit('dlzky', res.data)
        return res;
    },
    // pridaj zasobu
    async pridajZasobu({
                       commit
                   }, zasoba) {
        try {
            // commit('register_request');
            let res = await axios.post('http://localhost:3000/api/zasoby/', zasoba);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // pridaj zasobu
    async zmazZasobu({
                           commit
                       }, zasoba) {
        console.log(zasoba)
        try {
            // commit('register_request');
            commit('zmaz', zasoba)
            // delete musi byt v data bracket
            let res = await axios.delete('http://localhost:3000/api/zasoby/del', {data: zasoba});
            if (res.data.success !== undefined) {
                // commit('register_success');
            }
            return res;
        } catch (err) {
            // commit('register_error', err)
        }
    },
};

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    },
    zasoby_list(state, list) {
        state.zasoby = list
    },
    hrubky(state, list){
        state.hrubky = list
    },
    dlzky(state, list){
        state.dlzky = list
    },
    zmaz(state, item){
        state.zmaz = item
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};