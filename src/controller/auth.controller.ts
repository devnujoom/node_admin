import {Request,Response} from "express";
import {RegisterValidation} from "../validation/register.validation";


export const Register = (req:Request,res:Response) => {
  const body = req.body;
  const password = req.body.password;
  const repassword = req.body.password_confirmation;

  const {error} = RegisterValidation.validate(body);

  if(error) {

             return res.status(400).send(error.details);
            }
  if(password!=repassword)
{
  return res.status(400).send({
    message: "Password do not match"
  });
}

res.send(body);
}
