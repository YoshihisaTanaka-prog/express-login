import express from "express";
import expressWs from "express-ws";
import jwt from "jsonwebtoken"

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateFor_HTTP:express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token == null){
    res.sendStatus(403);
  } else {
    jwt.verify(token, JWT_SECRET, (_, decoded) => {
      if(decoded == null){
        res.sendStatus(403);
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};


export const authenticateFor_WS:expressWs.WebsocketRequestHandler = (ws, req, next)=>{
  const token = req.headers.authorization?.split(' ')[1];
  if (token == null) {
    ws.send(JSON.stringify({ error: 'No token provided' }));
    ws.close();
  } else {
    jwt.verify(token, JWT_SECRET, (_, decoded) => {
      if (decoded == null) {
        ws.send(JSON.stringify({ error: 'Invalid token' }));
        ws.close();
      } else {
        console.log(decoded)
        req.user = decoded;
        next();
      }
    });
  }
};