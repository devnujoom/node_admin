import {Request,Response} from "express";
import {RegisterValidation} from "../validation/register.validation";


export const Register = (req:Request,res:Response) => {
  const body = req.body;
  const password = req.body.password;
  const repassword = req.body.password_confirmation;

  var mailformat = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
  const email = req.body.email;

  const {error} = RegisterValidation.validate(body);

  if(error) {

             return res.status(400).send(error.details);
            }

  if(password!=repassword)  // check password match
{
  return res.status(400).send({
    message: "Password do not match"
  });
}





res.send(body);
}
