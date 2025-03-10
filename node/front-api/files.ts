import express from "express"
import jwt from "jsonwebtoken"
import path from "path";
import { app, JWT_SECRET } from "./utils.ts"

const PUBLIC_DIR = path.resolve(process.cwd(), "public");

export default ()=>{
  app.get("", (_, res: express.Response) => {
    res.sendFile(path.join(PUBLIC_DIR, "index.html"));
  });
  app.get("/favicon.ico", (_, res: express.Response) => {
    res.sendFile(path.join(PUBLIC_DIR, "favicon.ico"));
  });
  app.get("/common.css", (_, res: express.Response) => {
    res.sendFile(path.join(PUBLIC_DIR, "common.css"));
  });
  app.get("/init.js", (_, res: express.Response) => {
    res.sendFile(path.join(PUBLIC_DIR, "init.js"));
  });
  app.get("/main.js", (req: express.Request, res: express.Response) => {
    const { token } = req.query;
    if(token == null){
      res.sendFile(path.join(PUBLIC_DIR, 'login/main.js'));
    } else {
      jwt.verify(token as string, JWT_SECRET, (err, _) => {
        if (err == null){
          res.sendFile(path.join(PUBLIC_DIR, 'app/main.js'));
        } else {
          res.sendFile(path.join(PUBLIC_DIR, 'login/main.js'));
        }
      });
    }
  });
  app.get("/main.css", (req: express.Request, res: express.Response) => {
    const { token } = req.query;
    if(token == null){
      res.sendFile(path.join(PUBLIC_DIR, 'login/main.css'));
    } else {
      jwt.verify(token as string, JWT_SECRET, (err, _) => {
        if (err == null){
          res.sendFile(path.join(PUBLIC_DIR, 'app/main.css'));
        } else {
          res.sendFile(path.join(PUBLIC_DIR, 'login/main.css'));
        }
      });
    }
  });
  app.get('/*', (_, res: express.Response) => {
    res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
  });
}