import express from "express";
import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Device } from "../model/device.model";

export const app = express();
app.use(express.json());

class deviceClass {
  adddevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: any = req.headers["authorization"];

      const data: any = jwt.verify(token, String(process.env.SECRET_KEY));
      const user_id: any = data.user_id;

      const { device_type, device_name, device_model } = req.body;

      const device = await Device.create({
        device_type,
        device_name,
        device_model,
        user_id,
      });

      res.status(201).json({ "device added succesfully": Device });
    } catch (err) {
      console.log(err);
    }
  };

  getdevicebyid = async (req: any, res: any) => {
    try {
      const _id = req.params.id;
      const Data = await Device.findById(_id);
      res.status(200).json(Data);
    } catch (err: any) {
      res.status(400).json(err.message);
    }
  };
  updatebyid = async (req: any, res: any) => {
    try {
      const _id = req.params.id;
      const Dataupdated = await Device.findByIdAndUpdate(_id, req.body);
      res.json("Data updated");
    } catch (err) {
      res.send(err);
    }
  };
  removebyid = async (req: any, res: any) => {
    try {
      const _id = req.params.id;
      const Datadeleted = await Device.destroy({ where: { _id: _id } });
      res.json("Datadeleted");
    } catch (err) {
      res.send(err);
    }
  };
}
export const deviceController = new deviceClass();
