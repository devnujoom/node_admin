import {Request,Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import {getManager,getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import {sign,verify} from "jsonwebtoken";
import jwt_decode from 'jwt-decode';

// Register User
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

const userExists = await repository.findOne({email: req.body.email});

if(userExists)
{
  return res.status(400).send({
    message:"User already exists"
  });
}

const {password,...user} = await repository.save({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  password: await bcryptjs.hash(body.password,10)


})

res.send(user);
}


// Login
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
  // created payload
  const payload = {
    id: user.id

  }

  // created Token
  const token = sign(payload,process.env.SECRET_KEY);

  res.cookie("jwt",token,{
    httpOnly: true,
    maxAge:24*60*60*1000

  });

  const {password,...data} = user;


  res.send({

    message:"Success"

  }
  );
}
else
{
  res.status(400).send({
    message:"Invalid credentials"
  });
}

}


// authenticated Stable version
export const AuntenticateUser = async (req:Request,res:Response) => {

const {password,...user} = req['user'];
res.send(user);

}


// logout User
export const Logout = async (req:Request,res:Response) => {
//const jwt = req.cookies['jwt'];
//res.send(jwt);
res.cookie('jwt','',{maxAge:0})

res.send({
  message: 'Logout Successfully'
})
}


// update UserInfo
export const UpdateInfo = async (req:Request,res:Response) => {

const user = req['user'];
//console.log(user);
const repository = getRepository(User);
await repository.update(user.id,req.body);
const {password,...data} = await repository.findOne(user.id);
if(data)
{
  console.log("Updated Successfully");
}
res.send(data);

}


// update Password
export const UpdatePassword = async (req:Request,res:Response) => {

const user = req['user'];

if(req.body.password=="")
{
  return res.status(400).send({
    message:"Password is Blank"
  });
}
if(req.body.password_confirmation=="")
{
  return res.status(400).send({
    message:"Password is Blank"
  });
}

if(req.body.password!==req.body.password_confirmation)
{
  return res.status(400).send({
    message:"Password Do Not Match."
  });

}
const repository = getRepository(User);

await repository.update(user.id,{
  password: await bcryptjs.hash(req.body.password,10)
});

console.log(user);
const {password,...data} = user;

}
