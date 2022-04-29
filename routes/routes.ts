import { Router } from "express";
import auth from "../middleware/auth";
import { signup, login } from "../controller/usercontroller";
import { deviceController } from "../controller/devicecontroller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/adddevice", auth, deviceController.adddevice);
router.get("/getdevice/:id", auth, deviceController.getdevicebyid);
router.put("/updatedevice/:id", auth, deviceController.updatebyid);
router.delete("/deletedevice/:id", auth, deviceController.removebyid);

export default router;
