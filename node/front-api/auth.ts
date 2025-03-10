import express from "express";
import { app, User } from "./utils.ts"

export default ()=>{
  // ユーザー登録
  app.post('/sign-up', async (req: express.Request, res: express.Response) => {
    const { email, password, name } = req.body;
    const user = await User.create(email, password, name);
    if(user instanceof User){
      const token = user.toJwt();
      res.json({ token });
    } else {
      res.sendStatus(user);
    }
  });
  
  // ログイン（JWT発行）
  app.post('/sign-in', async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body
    const user = await User.authenticate(email, password);
    if(user instanceof User){
      const token = user.toJwt();
      res.json({ token });
    } else {
      res.sendStatus(user);
    }
  });
};