import {Request,Response} from "express";
import {User} from "../entity/user.entity";
import {getManager,getRepository} from "typeorm";
import bcryptjs from "bcryptjs";


// List Users
export const Users = async (req:Request,res:Response) => {

const repository = getRepository(User);

const users = await repository.find({
  relations: ['role'],
});

res.send(users.map(u=> {
  const {password,...data} = u;
  return data;
}));

}

// Create User
export const CreateUser = async (req:Request,res:Response) => {
const {role_id,...body} = req.body;
const hashedPassword = await bcryptjs.hash('1234',10);
const repository = getRepository(User);
const {password,...user} = await repository.save({
  ...body,
  password: hashedPassword,
  role:{
    id: role_id
  }
})
res.send(user);
}


// Get User By ID
export const GetUser =  async (req:Request,res:Response) => {
  try
  {
    const repository = getRepository(User);
    const {password,...user} = await repository.findOne(req.params.id, {relations: ['role']});

    res.send(user);
  }
catch
{
  res.send({
    message:"user do not exist"
  });
}
}

// Update UserInfo

export const UpdateUser =  async (req:Request,res:Response) => {
const {role_id,...body} = req.body;
const repository = getRepository(User);
const user  = await repository.update(req.params.id,{
  ...body,
  role:{
    id: role_id
  }
});
console.log(user);
res.status(202).send(user);
}


// Delete User
export const DeleteUser =  async (req:Request,res:Response) => {
try{
    const repository = getRepository(User);
    await repository.delete(req.params.id);
    res.status(204).send({
      message:"user  with id  deleted"
    });

}
catch {
  res.send({
    message:"Unautherised User"
  });
}
}
