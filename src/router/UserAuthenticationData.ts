
import { Router, Request, Response } from "express";
const routerLogin: Router = Router()
import {constrollersUser} from "../controllers/ControllerLogin"

routerLogin?.get( "/signup", constrollersUser.sigNUpC)!
routerLogin?.post( "/signup", constrollersUser.sigNUpC)!
routerLogin?.delete( "/signup", constrollersUser.sigNUpC)!
routerLogin?.put( "/signup", constrollersUser.sigNUpC)!
    
    

         
      
        

export  default routerLogin
