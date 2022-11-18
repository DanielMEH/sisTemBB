
import { Router, Request, Response } from "express";
const routerLogin: Router = Router()
import {constrollersUser} from "../controllers/ControllerLogin"

routerLogin?.post( "/login", constrollersUser.loginUser)!
routerLogin?.post( "/signup", constrollersUser.sigNUpC )!
routerLogin?.post("/createElection", constrollersUser.createElection)!;
// routerLogin?.delete( "/login", constrollersUser.sigNUpC)!
routerLogin?.put( "/login/:id", constrollersUser.loginUpdate)!
routerLogin.get("/AdminData", constrollersUser.getData)
    
export  default routerLogin
