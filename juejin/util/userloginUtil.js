import {
    getCookie,
    setCookie,
    delCookie
} from "~/util/cookieSessionStorate.js";

let hasLoginedCookKey = 'hasLoginedCookKey';
let userSessionKey = 'userSessionKey';
let homeSessionListKey = "homeSessionListKey";


export default {
    checkLogined() {
        var cookValue = getCookie(hasLoginedCookKey);
        return cookValue?true:false;
    },
    setLoginedUser(user) {
        setCookie(hasLoginedCookKey, true, 0.05);
        sessionStorage.setItem(userSessionKey, JSON.stringify(user));
    },
    getLoginedUser() {
        let user;
        if (!this.checkLogined()) {
            return null;
        }
        try {
            user = sessionStorage.getItem(userSessionKey);
            if (user) {
                user = JSON.parse(user);
            }
        } catch (error) {
            user = null;
        }

        return user;
    },
    setLogout() {
        delCookie(hasLoginedCookKey);
        sessionStorage.removeItem(userSessionKey);
    },
    setSessionData(value){
        sessionStorage.setItem(homeSessionListKey,JSON.stringify(value));
    },
    getSessionData(cb){
        let data = sessionStorage.getItem(homeSessionListKey) || {};
        cb &&cb(data);
    }
}
