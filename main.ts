import express from "express"
import router from "./routes/routes";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json())
app.use('/',router)
app.listen(process.env.PORT,()=>{
  console.log("listning at the port 6000");
})

  