import {Router} from "express";
import {Register} from "./controller/auth.controller";

export const routes = (router:Router)=>{

router.post('/register',Register);

}
