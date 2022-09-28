import {Request ,Response} from "express"
import  bcrypt from "bcrypt"
import {conexion} from "../class/ConexionDb"
class ControllerUser {
   


    public async sigNUpC( req: Request, res: Response ): Promise<any> {
        try {
            const { correo, password } = req.body;
            const connectDb = await conexion.connect();
            
            const roundNumber = 10;
            const encriptarPassword = await bcrypt.genSalt( roundNumber )
            const hasPassword = await bcrypt.hash(password, encriptarPassword )
            if ( correo !== null && password !== null ) {
             connectDb.query("INSERT INTO admin(correo, password) VALUES (?, ?)", [correo, hasPassword],(rows, error) => {
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

    public async loginUser(req:Request, res:Response){

        const { correo, password } = req.body;
        const connectDb = await conexion.connect();
        connectDb.query("SELECT idAdmin, password FROM admin WHERE correo = ?",[correo],async(error,rows)=>{

            if(rows.length >0){
               const passwordAuth = rows[0].password;
               const passVerify = await bcrypt.compare(password,passwordAuth)
            }
            
            if(error){
                
                console.log("no loguead0");
               return res.json({message:error})
            }

        })


    }
}


export const constrollersUser = new ControllerUser()