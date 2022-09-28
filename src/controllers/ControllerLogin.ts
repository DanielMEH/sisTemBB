import {Request ,Response} from "express"
import  bcrypt from "bcrypt"
import {conexion} from "../class/ConexionDb"
class ControllerUser {
   


    public async sigNUpC( req: Request, res: Response ) {

        
        try {
            const { correo, password } = req.body;
            const connectDb = await conexion.connect();
            
            const roundNumber = 10;
            const encriptarPassword = await bcrypt.genSalt( roundNumber )
            const hasPassword = await bcrypt.hash(password, encriptarPassword )
            if ( correo !== null && password !== null ) {
                
             connectDb.query("INSERT INTO admin(correo, password) VALUES (?, ?)", [
                    correo, hasPassword 
             ], (rows, error) => {
                 console.log(rows);
                 console.log(error);
                 
                    if (rows) {
                        console.log("insertado datos");
                        return res.json({message:rows})
                    }
                    
                    if (error) {
                        console.log("no insertado");
                       return  res.json({mesage:error, err:"Error"})
                    }

                    
                })
                
            } else {
                
                res.json({message:"DataInvalid"})
            }

            
        } catch (error) {
            
        }
        
        
        

    }
}


export const constrollersUser = new ControllerUser()