import express from "express";
import { Request, NextFunction, Response } from "express";
import md5 from "md5";
import jwt from "jsonwebtoken";
import {User} from "../model/user.model";
import U_Schema from "../validation/user.validation";
import { STATUS_MSG } from "../constant/app.constatnt";
export const app = express();
app.use(express.json());

async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    await U_Schema.validateAsync(req.body);

    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({where:{email }});
    if (oldUser) {
        
      res.status(409).json("User Already Exist. Please Login");
    } else {
    
      const encryptedPassword = md5(password);
      const user = await User.create({
        
        firstName,
        lastName, 
        email,
        password: encryptedPassword,
      });

      res.status(201).json(STATUS_MSG.SUCCESS.CREATED({user:user}));
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

async function login(req: any, res: any) {
  try {
    const { email, password } = req.body;
    console.log(email,password);

    const user: any = await User.findOne({ where:{email} });

    if (user.token) {
      res.status(400).json("User is already logged in");
    } else if (md5(password) === user.password) {
      console.log(user.password);
      const data = jwt.sign({ user_id: user.id }, <string>process.env.SECRET_KEY ,{
        expiresIn: "2h",
      });

      user.token = data;
      user.save();
      res.status(200).json(STATUS_MSG.SUCCESS.LOGIN({token:data}));
      // res.end();
    } else {
      res.status(400).json(STATUS_MSG.ERROR.INVALID_CREDENTIALS);
    }
  } catch (err: any) {
    res.json({ Message: err.message });
  }
}
export { signup, login };
