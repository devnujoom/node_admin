import {Request,Response} from "express";
import {getManager,getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import {sign,verify} from "jsonwebtoken";


export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {

try
   {
     const jwt = req.cookies['jwt'];

     if(!jwt)
     {
       return res.status(401).send({

         message: "Unauthenticated"
       });
     }

     const payload: any = verify(jwt,process.env.SECRET_KEY);

     if(!payload)
     {
       return res.status(401).send({

         message: "Unauthenticated"
       });
     }

        const repository = getRepository(User);

        req["user"] = await repository.findOne({id:payload.id});

        next();

      } catch (e) {


  return res.status(401).send({

    message: "Unauthenticated"

  });

               }
}
