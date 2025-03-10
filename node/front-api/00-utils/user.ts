import Axios from "axios";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./authorize.ts";

const axios = Axios.create({
  baseURL: "http://rails:3000/users",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

export class User {
  id: string;
  email: string
  name: string;
  private constructor(id: number, email: string, name: string){
    this.id = `${id}`.padStart(12, '0');
    this.email = email,
    this.name = name || "";
  }

  toJwt(){
    return jwt.sign({id: this.id, email: this.email, name: this.name}, JWT_SECRET, { expiresIn: '1h' });
  }

  static create(email:string, password:string, name:string){
    return new Promise<User|number>((resolve) => {
      axios.post("", {user: {email, password, name}}).then((response) => {
        if(response.status < 400){
          const {id, email, name} = response.data;
          resolve(new User(id, email, name));
        } else {
          resolve(response.status);
        }
      }).catch((_) => {
        resolve(500);
      });
    });
  }

  static authenticate(email:string, password:string){
    return new Promise<User|number>((resolve) => {
      axios.post("/sign_in", {email, password}).then((response) => {
        console.log("User", response.data);
        if(response.data){
          const {id, email, name} = response.data;
          resolve(new User(id, email, name));
        } else {
          resolve(401);
        }
      }).catch((_) => {
        resolve(500);
      });
    });
  }
}

