import express,{json, Request, Response, }  from "express"
import morgan from "morgan";
import cors from "cors"
import { PORT } from "../config/Config"
import  routerLogin from "../router/UserAuthenticationData"
import path from "path"
import sessions from "express-session"
import cookieParse from "cookie-parser"

async function Server() {
    
    try {
        const appServer: express.Application = express();
    appServer?.use( cors( {
        
    }))
    const timeEXp = 1000 * 60 * 60 * 24;
appServer.use(
  sessions({
    secret: "rfghf66a76ythggi87au7td",
    saveUninitialized: true,
    cookie: { maxAge: timeEXp },
    resave: false,
  })
);

    appServer?.set( "views", path.join( __dirname, "views" ))
    appServer?.use(express.json() )
    appServer?.use(express.urlencoded({ extended: true }))
     appServer?.use(routerLogin )
    appServer?.use(( req: Request, res: any, next ): String => {
        
       return res.status(404).json({message:"Esta ruta no existe"})
         
     })
    appServer.listen( PORT || 3001, (): String |any| Number => {
        console.log("Conectado en el puerto:",PORT);
        
    } )
       
       
    } catch (error: any) {
        
        throw new Error(error)
    }

  
}

Server();

 
