import expressWs from 'express-ws';
import { app as globalApp, authenticateFor_WS as authorize } from "../utils.ts";

export default ()=>{
  const app = expressWs(globalApp).app;
  app.ws("/ws/command", authorize, (ws, req)=>{
  });
  return app;
}