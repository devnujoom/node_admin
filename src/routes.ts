import {Router} from "express";
import {Register,Login,AuntenticateUser,Logout,UpdateInfo,UpdatePassword} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
export const routes = (router:Router)=>{

//login
router.post('/register',Register);

//register
router.post('/login',Login);

//AuthenticateUser
router.get('/user', AuthMiddleware, AuntenticateUser);

//Logout users
router.post('/logout', AuthMiddleware, Logout);

//Update Info
router.put('/users/info', AuthMiddleware, UpdateInfo);

//update Password
router.put('/users/password', AuthMiddleware, UpdatePassword);

}
