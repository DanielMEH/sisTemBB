import {Request ,Response} from "express"
import  bcrypt from "bcrypt"
import {conexion} from "../class/ConexionDb"
import session, { Session } from "express-session";
class ControllerUser {
    public async sigNUpC(req: Request, res: Response): Promise<any> {
        try {
            const { correo, password } = req.body;
            const connectDb = await conexion.connect();

            const roundNumber = 10;
            const encriptarPassword = await bcrypt.genSalt(roundNumber);
            const hasPassword = await bcrypt.hash(password, encriptarPassword);
            if (correo !== null && password !== null) {
                connectDb.query("SELECT * FROM admin",(error,rows)=>{
                        for (let i = 0; i < rows.length; i++) {
                            if (rows[i].correo == correo) {
                                return res.json({ message: "EMAIL_EXIST"});      
                            }
                            
                        }
                        connectDb.query(
                            "INSERT INTO admin(correo, password) VALUES (?, ?)",
                            [correo, hasPassword],
                            (error, rows) => {
                                if (rows) {
                                   
                                return res.json({ message: "insetUser"});
                                      
                                }
        
                                if (error) {
                                    return res.json({ mesage: error, err: "Error" });
                                }
                            }
                        );
                    
                })
               
               
            } 
        } catch (error) { 
            res.json({ message: "Error 404" });
        }
    }

    public async loginUser(req: Request, res: Response) {
        const { correo, password } = req.body;
        const connectDb = await conexion.connect();
        connectDb.query(
            "SELECT idAdmin, password FROM admin WHERE correo = ?",
            [correo],
            async (error, rows) => {
                if (rows.length > 0) {
                    const passwordAuth = rows[0].password;
                    const passVerify = await bcrypt.compare( password, passwordAuth );
                    
                    if ( passVerify ) {

                        let sessions;
                        sessions = req.session;
                        sessions.idUser = rows[0].idAdmin
                        
                        res.json({message:"SUCCESFULUSER"})
                        
                    } else {
                        
                        res.json({message:"EROORUSER"})
                    }
                }

                if (error) {
                    console.log("no loguead0");
                    return res.json({ message: error });
                }
            }
        );
    }

    public async loginUpdate() {
        
    }
}

export const constrollersUser = new ControllerUser();
