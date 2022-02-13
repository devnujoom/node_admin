import {Router} from "express";
import {Register,Login,AuntenticateUser,Logout,UpdateInfo,UpdatePassword} from "./controller/auth.controller";
import {Users,CreateUser,GetUser,UpdateUser,DeleteUser} from "./controller/user.controller";
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

// users info
router.get('/users', AuthMiddleware,  Users);

// Create User
router.post('/createuser', AuthMiddleware,  CreateUser);

// Get User By Id
router.get('/users/:id', AuthMiddleware,   GetUser);

//Update User
router.put('/users/:id', AuthMiddleware,   UpdateUser);

// Delete User
router.delete('/users/:id', AuthMiddleware,   DeleteUser);

}
