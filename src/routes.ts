import {Router} from "express";
import {Register,Login} from "./controller/auth.controller";

export const routes = (router:Router)=>{

//login
router.post('/register',Register);

//register
router.post('/login',Login);

}
