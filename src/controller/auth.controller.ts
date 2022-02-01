import {Request,Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import {getManager,getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";

export const Register = async (req:Request,res:Response) => {
  const body = req.body;



  const email = req.body.email;

  const {error} = RegisterValidation.validate(body);

  if(error) {

             return res.status(400).send(error.details);
            }

  if(req.body.password!==req.body.password_confirmation)  // check password match
{
  return res.status(400).send({
    message: "Password do not match"
  });
}

const repository = getRepository(User);

const {password,...user} = await repository.save({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  password: await bcryptjs.hash(body.password,10)


})

res.send(user);
}

export const Login = async (req:Request,res:Response) => {

const repository = getRepository(User);
const user = await repository.findOne({email: req.body.email});


if(!user)
{
  return res.status(400).send({
    message:"This User Not Available"
  });
}




if(await bcryptjs.compare(req.body.password,user.password))
{

  const {password,...data} = user;
  res.send(data);
}
else{
  res.status(400).send({
    message:"Invalid credentials"
  });
}




}
