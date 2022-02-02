import {Router} from "express";
import {Register,Login,AuntenticateUser} from "./controller/auth.controller";

export const routes = (router:Router)=>{

//login
router.post('/register',Register);

//register
router.post('/login',Login);

//AuthenticateUser
router.get('/user',AuntenticateUser);

}
