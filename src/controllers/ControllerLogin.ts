import {Request ,Response} from "express"
import  bcrypt from "bcrypt"
import {conexion} from "../class/ConexionDb"
import session, { Session } from "express-session";
class ControllerUser {
   


    public async sigNUpC( req: Request, res: Response ): Promise<any> {
        try {
            const { correo, password } = req.body;
            const connectDb = await conexion.connect();
            
            const roundNumber = 10;
            const encriptarPassword = await bcrypt.genSalt( roundNumber )
            const hasPassword = await bcrypt.hash(password, encriptarPassword )
            
             connectDb.query("INSERT INTO admin(correo, password) VALUES (?, ?)", [correo, hasPassword],(error, rows) => {
                    if (rows) {
                        console.log("insertado datos");
                        return res.json({message:rows})
                    }
                    
                    if (error) {
                        console.log("no insertado");
                       return  res.json({mesage:error, err:"Error"})
                    }

                    
                })
          
            
        } catch (error) {
            
        }

    }

    public async loginUser(req:Request, res:Response): Promise<any>{

        const { correo, password } = req.body;
        const connectDb = await conexion.connect();
        connectDb.query("SELECT idAdmin, password FROM admin WHERE correo = ?",[correo],async(error,rows)=>{

            if(rows.length > 0){
               const passwordAuth = rows[0].password;
                const passVerify = await bcrypt.compare( password, passwordAuth )
                if ( passVerify ) {

                    let sessions: any;
                     sessions = req.session;
                    sessions.iUser = rows[0].idAdmin;
                    console.log(sessions.iUser);
                    
                   return  res.json({message:rows, messg:"SUCESSFULL"})
                    
                } else {
                    return res.json( { message: "ErrorUser" } )
                    
                }
            }
            
            if(error){
                
                console.log("no logueado");
               return res.json({message:error})
            }

        })


    }

    public async loginUpdate() {
        
    }
}


export const constrollersUser = new ControllerUser()