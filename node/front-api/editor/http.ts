import { app, authenticateFor_HTTP as authorize } from "../utils.ts";

export default ()=>{
  app.post("/test", authorize, (req, res)=>{
    console.log("test", req.body);
    res.send("OK");
  });
}