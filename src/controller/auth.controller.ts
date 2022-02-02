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
  const token = sign(payload,"secret");

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



// Autenticate User

export const AuntenticateUser1 = async (req:Request,res:Response) => {

const jwt = req.cookies['jwt'];

//const payload: any = verify(jwt,"secret");
//let decoded = jwt_decode(jwt);


const payload: any = verify(jwt,"secret", (err, decoded) => {
     if (err) {
       return res.status(401).send({
         message: "Unauthorized!"
       });
     }

     return decoded.id;


   });



   const repository = getRepository(User);
   const {password,...user} = await repository.findOne({id:payload});
   res.send(user);
/*

if(!payload)
{
  return res.status(401).send({

    message: "Invalid User"
  });
}
else{
  const user =payload;

  const response =     {
        login:true,
        data: user,
        message: "login Success"
      }
  res.json(
response.data

  );
}
*/
//const repository = getRepository(User);

//const user = await repository.findOne(payload);

//res.send(user);
/*

*/


}


export const AuntenticateUser = async (req:Request,res:Response) => {

const jwt = req.cookies['jwt'];

if(!jwt)
{
  return res.status(401).send({

    message: "Invalid User"
  });
}

const payload: any = verify(jwt,"secret");

if(!payload)
{
  return res.status(401).send({

    message: "Invalid User"
  });
}

   const repository = getRepository(User);
   const {password,...user} = await repository.findOne({id:payload.id});
   res.send(user);



}
